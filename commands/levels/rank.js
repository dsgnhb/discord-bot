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

  async run(message, args) {
    try {
      const settings = message.settings
      let user = message.guild.members.get(message.mentions.users.first().id) || message.member
      const data = await this.f.getData(user)
      if (!data) return message.channel.send("Dich gibt's hier ned. Noch ned.")
      message.channel.send(
        new RichEmbed()
          .setAuthor('Levels | ' + user.username, user.avatarURL)
          .setURL('https://dsgnhb.de/levels/')
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
