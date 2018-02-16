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

  async run(message) {
    const args = message.args
    let user = message.mentions.users.first() ? message.guild.members.get(message.mentions.users.first().id) : undefined
    const amount = Number(args[2])
    const method = args[0]
    if (!user || !amount || !method) throw ('Nutze `!give xp/chests <@user> <amount>` um die Stats eines Users zu manipulieren. 😉')
    if (!Number.isInteger(amount)) throw ('Is ' + amount + ' ne Zahl? lol')
    switch (method) {
      case 'xp':
        this.f.addXP(user, amount)
        return (`Es wurden ${amount} XP an ${user} vergeben!`)
        break
      case 'chests':
        this.f.addChests(user, amount)
        return (`Es wurden ${amount} Chests an ${user} vergeben!`)
        break
      case 'coins':
        this.f.addCoins(user, amount)
        return (`Es wurden ${amount} Coins an ${user} vergeben!`)
        break
      default:
        break
    }
  }
}

module.exports = Give
