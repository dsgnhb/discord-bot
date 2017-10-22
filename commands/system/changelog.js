const Command = require('../../base/commands/Command.js')

const path = require('path')
const { RichEmbed } = require('discord.js')

class Changelog extends Command {
  constructor(client) {
    super(client, {
      name: 'changelog',
      category: 'System',
      description: 'Neue Features ;)',
      usage: 'changelog',
      dm: true,
      guild: true,
      permLevel: 0
    })
  }

  async run(message, args) {
    const settings = message.settings

    const changelog = await require('../../changelog.json')
    const packageJSON = await require('../../package.json')

    await message.channel.send(
      new RichEmbed()
        .setAuthor(`Changelog v${packageJSON.version}`)
        .setDescription(changelog[packageJSON.version].join('\n'))
        .setURL(packageJSON.repository.url.split('+')[1].slice(0, -4))
        .setColor(settings.embedColor)
        .setTimestamp()
        .setFooter(settings.embedFooter, settings.embedIcon)
    )
  }
}

module.exports = Changelog
