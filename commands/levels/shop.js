const LevelsCommand = require('../../base/commands/LevelsCommand.js')

class Shop extends LevelsCommand {
  constructor(client) {
    super(client, {
      name: 'shop',
      aliases: ['buy'],
      description: 'Kaufen kaufen kaufen',
      usage: 'shop',
      dm: false,
      guild: true,
      permLevel: 0
    })
  }

  async run(message, args) {
    const shop = {
      chest: {
        name: 'eine Chest',
        price: 20,
        run: function(_this, message) {
          _this.f.addChests(message.member, 1)
        }
      },
      coins: {
        name: '10 Coins',
        price: 20,
        run: function(_this, message) {
          _this.f.addCoins(message.member, 10)
        }
      }
    }
    if (args.length < 1) {
      message.reply('Hier muss noch ne Liste hin')
    } else {
      if (!shop[args[0]]) throw "Das gibt's ned zu kaufen"
      const item = shop[args[0]]

      const removeCoins = await this.f.removeCoins(message.member, item.price)
      if (!removeCoins) throw 'Du hast leider nicht genug Coins!'

      item.run(this, message)
      message.channel.send(`WHOOH! Du hast dir **${item.name}** für **${item.price} Coins** gekauft!`)
    }
  }
}

module.exports = Shop
