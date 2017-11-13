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
    if (!user || !amount) throw 'Nutze `!pay <@user> <amount>` um endlich mal deine Schulden zu bezahlen.'
    if (user.id === message.author.id) throw 'Das macht ja mal garkeinen Sinn?!'
    if (amount <= 0) throw 'He! Du wolltest mich wohl reinlegen. 😏'
    if (user.bot) throw 'Ein Bot keine deine Spende leider ned annehmen!'
    try {
      if (message.author.permLevel < 9) {
        const removeCoins = await this.f.removeCoins(message.author, amount)
        if (!removeCoins) throw 'Du hast leider nicht genug Coins!'
      }
      this.f.addCoins(user, amount)
      message.reply(`Du hast ${amount} Coins an ${user} gesendet!`)
    } catch (error) {
      throw error
    }
  }
}

module.exports = Pay
