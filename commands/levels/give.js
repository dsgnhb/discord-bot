const LevelsCommand = require('../../base/commands/LevelsCommand.js')

class Give extends LevelsCommand {
  constructor(client) {
    super(client, {
      name: 'give',
      aliases: ['ichwill'],
      description: 'Manipuliere die Stats eines Users (und werde Erster im Leaderboard).',
      usage: 'give xp/chests <@user> <amount>',
      dm: false,
      guild: true,
      permLevel: 9
    })
  }

  async run(message, args) {
    const user = message.mentions.users.first()
    const amount = Number(args[2])
    const method = args[0]
    if (!user || !amount || !method) return message.channel.send('Nutze `!give xp/chests <@user> <amount>` um die Stats eines Users zu manipulieren. 😉')
    if (!Number.isInteger(amount)) return message.channel.send('Is ' + amount + ' ne Zahl? lol')
    switch (method) {
      case 'xp':
        this.f.addXP(user, amount)
        message.channel.send(`Es wurden ${amount} XP an ${user} vergeben!`)
        break
      case 'chests':
        this.f.addChests(user, amount)
        message.channel.send(`Es wurden ${amount} Chests an ${user} vergeben!`)
        break
      case 'coins':
        this.f.addCoins(user, amount)
        message.channel.send(`Es wurden ${amount} Coins an ${user} vergeben!`)
        break
      default:
        break
    }
  }
}

module.exports = Give
