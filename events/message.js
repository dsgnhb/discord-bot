const Event = require('../base/events/Event.js')

const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)

class Message extends Event {
  constructor(client) {
    super(client)
  }
  async run(message) {
    if (message.author.bot) return

    const settings = message.guild ? this.client.settings.get(message.guild.id) : this.client.config.defaultSettings
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
    */
    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ +/g)
    /*
    Flo Version
    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .match(/[^\s"']+|"([^"]*)"|'([^']*)'/g)
    */
    const command = args.shift().toLowerCase()
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
    if (!cmd) return
    if (!message.guild && !cmd.conf.dm) return message.channel.send('This command is unavailable via private message.')
    if (message.guild && !cmd.conf.guild) return message.channel.send('This command is unavailable via Guild.')

    message.flags = []
    while (args[0] && args[0][0] === '-') {
      message.flags.push(args.shift().slice(1))
    }

    if (level < cmd.conf.permLevel) return
    this.client.log('log', `${message.author.username} (${message.author.id}) ran command ${cmd.help.name} - ${args.join(',')}`, 'CMD')
    cmd.run(message, args)
  }
}

module.exports = Message
