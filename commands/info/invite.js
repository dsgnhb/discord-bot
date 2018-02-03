const Command = require('../../base/commands/Command.js')

class Invite extends Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      category: 'Info',
      description: 'Hier is leider keine Magie. Nur ein Link. :(',
      usage: 'invite',
      dm: true,
      guild: true,
      permLevel: 0
    })
  }

  async run(message, args) {
    message.channel.send('https://designhub.fun/discord')
  }
}

module.exports = Invite
