const Command = require('../../base/commands/Command.js')

const { RichEmbed } = require('discord.js')

class Help extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      category: 'Help',
      description: 'Den Command hast du doch gerade ausgeführt..',
      usage: 'help (<command>)',
      permLevel: 0
    })
  }

  async run(message) {
    const args = message.args
    const settings = message.settings
    const level = message.author.permLevel
    if (!args[0]) {
      const myCommands = message.guild ? this.client.commands.filter(cmd => cmd.conf.permLevel <= level && (cmd.conf.dm === true || cmd.conf.guild === true)) : client.commands.filter(cmd => cmd.conf.permLevel <= level && cmd.conf.guild !== true)
      const commandNames = myCommands.keyArray()
      let currentCategory = ''
      let msg = {
        embed: {
          color: 3058623,
          author: {
            name: 'Commands',
            icon_url: message.guild.iconURL
          },
          description: `Mehr gibt's mit **${settings.prefix}help <command>**`,
          fields: [],
          timestamp: new Date(),
          footer: {
            icon_url: settings.embedIcon,
            text: settings.embedFooter
          }
        }
      }
      let i = -1
      const sorted = myCommands.array().sort((p, c) => (p.help.category > c.help.category ? 1 : -1))
      sorted.forEach(c => {
        const cat = c.help.category.toProperCase()
        if (currentCategory !== cat) {
          msg.embed.fields.push({ name: cat, value: '' })
          currentCategory = cat
          i++
        }
        msg.embed.fields[i].value += `**${settings.prefix}${c.help.name}** - ${c.help.description}\n`
      })
      return (msg)
    } else {
      let command = args[0]
      if (this.client.commands.has(command)) {
        command = this.client.commands.get(command)
        if (level < command.conf.permLevel) return
        const embed = new RichEmbed()
          .setAuthor(`${settings.prefix}${command.help.name}`, message.guild.iconURL)
          .setColor(settings.embedColor)
          .setDescription(command.help.description)
          .addField('Usage', `${settings.prefix}${command.help.usage}`, false)
          .addField('Coins', command.help.price, true)
          .setTimestamp()
          .setFooter(settings.embedFooter, settings.embedIcon)
        return (embed)
      }
    }
  }
}

module.exports = Help
