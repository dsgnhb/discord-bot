const LevelsCommand = require('../../base/commands/LevelsCommand.js')

class Pay extends LevelsCommand {
  constructor(client) {
    super(client, {
      name: 'pay',
      aliases: ['gebe', 'ichwill'],
      description: 'Bezahle endlich mal deine Schulden.',
      usage: 'pay <@user> <amount>',
      dm: false,
      guild: true,
      permLevel: 0
    })
  }

  async run(message, args) {
    const user = message.mentions.users.first()
    const amount = Number(args[1])
    if (!user || !amount) return message.reply('Nutze `!pay <@user> <amount>` um endlich mal deine Schulden zu bezahlen.')
    if (user.id === message.author.id) return message.reply('Das macht ja mal garkeinen Sinn?!')
    if (amount <= 0) return message.reply('He! Du wolltets mich wohl reinlegen. 😏')
    try {
      if (!message.author.level >= 9) {
        const removeCoins = await this.f.removeCoins(message.author, amount)
        console.log(removeCoins)
        if (!removeCoins) return message.reply('Du hast leider nicht genug Coins!')
      }
      this.f.addCoins(user, amount)
      message.reply(`Du hast ${amount} Coins an ${user} gesendet!`)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Pay
