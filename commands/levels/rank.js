const LevelsCommand = require('../../base/commands/LevelsCommand.js')

const { RichEmbed } = require('discord.js')

class Level extends LevelsCommand {
  constructor(client) {
    super(client, {
      name: 'rank',
      aliases: ['level', 'levels', 'coins', 'chests'],
      description: 'Und.. Bin ich noch Erster? WAS?! APORED WIRD DEIN DORF VERBRENNEN!',
      usage: 'rank',
      dm: true,
      guild: true,
      permLevel: 0
    })
  }

  async run(message) {
    try {
      const settings = message.settings
      let user = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : message.member
      const data = await this.f.getData(user)
      if (!data) throw ("Dich gibt's hier ned. Noch ned.")
      return (
        new RichEmbed()
          .setAuthor('Levels | ' + user.user.username, user.user.avatarURL)
          .setURL('https://designhub.fun/levels/')
          .setColor(settings.embedColor)
          .addField('Rank', `**${data.rank}**/${message.guild.memberCount}`, true)
          .addField('Level', `**${data.level}** (${data.totalXP} XP)`, true)
          .addField('Coins', `**${data.coins}**`, true)
          .addField('Chests', `**${data.chests}**`, true)
          .setTimestamp()
          .setFooter(settings.embedFooter, settings.embedIcon)
      )
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = Level
