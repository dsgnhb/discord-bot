const Command = require('../../base/commands/Command.js')

class Christmas extends Command {
  constructor(client) {
    super(client, {
      name: 'christmas',
      aliases: ['open', 'gommewin', 'advent'],
      description: 'WEIHNAHCTENENENENNEEE',
      usage: 'christmas',
      dm: true,
      guild: false,
      permLevel: 10
    })
  }

  async run(message, args) {
    const gifts = require('../../configs/christmas.json')

    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()

    /*
    if (month === 11) throw 'Da wolltest du deinen Adventskalender wohl schon früher aufmachen! 😏'
    if (month !== 12 || day > 24) throw 'Der Adevent is leider schon zuende 😥'

    // NICK USER IN MAINGUILD TO 🎄 + name
    this.client.guilds
      .get(this.client.config.mainGuildID)
      .members.get(message.author.id)
      .setNickname('🎄 ' + message.author.username)
    */

    // GET OPEN ITEM FROM ARRAY WITH CURRENT DATE (DAY)
    const gift = gifts[day]

    /*
    // SAVE CURRENT DATE (DAY) TO PERSISTENT COLLECTION, christmas.get(message.author.id)
    const data = this.client.christmas.get(message.author.id) || []
    if (data.includes(day)) throw 'Du hast heute doch schon dein Türchen geöffnet! 🤶🎄'
    data.push(day)
    this.client.christmas.set(message.author.id, data)
    */

    // SEND SELECTED ITEM
    message.channel.send(`**HoHoHo!** 🤶🎄\nHier das Türchen für den **${day}. Dezember**! ⭐\n${gift.title} \nhttps://youtu.be/${gift.vidID}`)
  }
}

module.exports = Christmas
