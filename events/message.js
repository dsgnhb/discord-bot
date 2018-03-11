const Event = require('../base/events/Event.js')
const LevelsBase = require('../base/base/LevelsBase.js')

const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)

class Message extends Event {
  constructor(client) {
    super(client)
    this.levels = new LevelsBase(client)
  }
  async run(message) {
    if (message.author.bot) return

    const settings = message.guild ? this.client.settings.get(message.guild.id) : this.client.settings.get('default')
    message.settings = settings

    // User's PermLevel
    const level = this.client.permlevel(message)
    message.author.permLevel = level

    // Monitors
    this.client.monitors.forEach(function(monitor, name, map) {
      if (!message.guild && !monitor.conf.dm) return
      if (message.guild && !monitor.conf.guild) return
      if (level > monitor.conf.maxPermLevel) return
      monitor.run(message)
    })

    // Ignore messages without prefix
    if (message.content.indexOf(settings.prefix) !== 0) return

    // Getting Message Arguments
    /*
    GuideBot Version
    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ +/g)
    */
    // Flo Version
    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .match(/[^\s"']+|"([^"]*)"|'([^']*)'/g)
    // Remove Double- & Single Quotes
    for (let i = 0; i < args.length; i++) {
      args[i] = args[i].replace(/['"]+/g, '')
    }
    message.args = args

    const command = args.shift().toLowerCase()
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
    if (!cmd) return
    if (!message.guild && !cmd.conf.dm) return message.reply("Dieser Command kann nur auf'm Discord genutzt werden!")
    if (message.guild && !cmd.conf.guild) return

    if (level < cmd.conf.permLevel) return
    if (cmd.help.price > 0 && level < 9) {
      const coins = await this.levels.removeCoins(message.member, cmd.help.price)
      if (!coins) return message.reply(`Du hast **nicht genug Coins** um diesen Command zu nutzen! Du brauchst mindestens **${cmd.help.price} Coins**.`)
    }
    const channel = message.guild ? message.channel.name : message.channel.type
    const guild = message.guild ? message.guild.name : ''
    this.client.log('log', `${message.author.username} (${message.author.id}) ran command ${cmd.help.name} in ${channel} ${guild} - ${args.join(',')}`, 'CMD')

    try {
      let res = await cmd.run(message)
      if (res === undefined || (res.length > 2000 || res.length < 1)) return
      message.channel.send(res)
    } catch (error) {
      console.log(error)
      if (error === undefined || (error.length > 2000 || error.length < 1)) return
      error = error.toString()
      //this.client.log('log', error, `CMD | ${cmd.help.name}`)
      message.reply(error)
      return
    }
  }
}

module.exports = Message
