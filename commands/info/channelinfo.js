const Command = require('../../base/commands/Command.js')

const { RichEmbed } = require('discord.js')

class Channelinfo extends Command {
  constructor(client) {
    super(client, {
      name: 'channelinfo',
      category: 'Info',
      description: 'Erfahre die Channel-Beschreibung ohne hochzuschauen (is unnötig lol)',
      usage: 'channelinfo',
      dm: false
    })
  }

  async run(message, args) {
    const settings = message.settings
    const channel = message.channel
    const embed = new RichEmbed()
      .setAuthor(`#${channel.name}`, message.guild.iconURL)
      .setColor(settings.embedColor)
      .addField('Topic', `${channel.topic}`, false)
      .addField('Position', `${channel.position}`, true)
      .setTimestamp()
      .setFooter(settings.embedFooter, settings.embedIcon)
    message.channel.send({ embed }).catch(e => console.error(e))
  }
}

module.exports = Channelinfo
