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

  async run(message) {
    const settings = message.settings

    const packageJSON = await require('../../package.json')

    var git = require('git-last-commit')
    git.getLastCommit(function (err, commit) {
      return (
        new RichEmbed()
          .setAuthor(`Changelog v${packageJSON.version}`)
          .setDescription(commit.subject)
          .setURL(packageJSON.repository.url.split('+')[1].slice(0, -4))
          .setColor(settings.embedColor)
          .setTimestamp()
          .setFooter(settings.embedFooter, settings.embedIcon)
      )
    })
  }
}

module.exports = Changelog
