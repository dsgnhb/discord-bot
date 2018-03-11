const Command = require('../../base/commands/Command.js')

class Permlevel extends Command {
  constructor(client) {
    super(client, {
      name: 'permlevel',
      category: 'Info',
      description: 'Deine Perms.',
      usage: 'permlevel',
      dm: true,
      guild: true,
      permLevel: 0
    })
  }

  async run(message) {
    throw message.author.permLevel
  }
}

module.exports = Permlevel
