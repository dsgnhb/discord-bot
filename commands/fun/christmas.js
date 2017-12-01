const Command = require('../../base/commands/Command.js')

class Christmas extends Command {
  constructor(client) {
    super(client, {
      name: 'christmas',
      aliases: ['open', 'gommewin', 'advent'],
      description: 'WEIHNAHCTENENENENNEEE',
      usage: 'christmas',
      dm: true,
      guild: true,
      permLevel: 0
    })
  }

  async run(message, args) {
    if (message.guild) throw 'Öffne in der **Adventszeit** jeden Tag **ein neues Türchen**, in dem du den **Bot per DM** mit `!open` anschreibst! 🤶🎄'

    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()

    if (month === 11) throw 'Da wolltest du **deinen Adventskalender** wohl schon **früher aufmachen**! 😏'
    if (month !== 12 || day > 24) throw 'Der **Advent** is leider **schon zuende**! 😥'

    this.client.guilds
      .get(this.client.config.mainGuildID)
      .members.get(message.author.id)
      .setNickname('🎄 ' + message.author.username)

    const gifts = require('../../configs/christmas.json')

    const gift = gifts[day]
    if (!gift) throw 'MEGA DB ERROR 🚨🚨'

    const data = this.client.christmas.get(message.author.id) || []
    if (data.includes(day)) {
      throw 'Du hast **heute** doch schon **dein Türchen geöffnet**! 🤶🎄'
    } else {
      data.push(day)
      this.client.christmas.set(message.author.id, data)
    }

    message.channel.send(`**HoHoHo!** 🤶🎄\nHier das Türchen für den **${day}. Dezember**! ⭐\n\n${gift.title} \nhttps://youtu.be/${gift.vidID}`)
  }
}

module.exports = Christmas
