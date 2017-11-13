const Command = require('../../base/commands/Command.js')

const { RichEmbed } = require('discord.js')

class Serverinfo extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      aliases: ['serverstats', 'guildinfo', 'guildstats', 'info'],
      category: 'Info',
      description: 'Ja, hier sieht man auch den die Anzahl der Member.',
      usage: 'serverinfo',
      dm: false
    })
  }

  async run(message, args) {
    const settings = message.settings
    const embed = new RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor(settings.embedColor)
      .addField('Owner', `${message.guild.owner.user.tag} (${message.guild.owner.id})`, false)
      .addField(
        'Member Count',
        `${message.guild.memberCount} (${message.guild.members.filter(m => m.presence.status === 'dnd' || m.presence.status === 'idle' || m.presence.status === 'online').size} online)`,
        true
      )
      .addField('Location', message.guild.region, true)
      .addField('Created', message.guild.createdAt.toLocaleString(), true)
      .addField('Roles', message.guild.roles.size, true)
      .setTimestamp()
      .setFooter(settings.embedFooter, settings.embedIcon)
    message.channel.send({ embed }).catch(e => console.error(e))
  }
}

module.exports = Serverinfo
