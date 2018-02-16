const Command = require('../../base/commands/Command.js')

class Avatar extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      aliases: [],
      category: 'System',
      description: 'Neues Avatar',
      usage: 'avatar <url>',
      dm: true,
      guild: true,
      permLevel: 10
    })
  }

  async run(message) {
    const args = message.args
    let avatar = args[0] || ''
    if (!avatar.startsWith('https://')) throw ('Joa. Des is aber kein Link!')
    try {
      await this.client.user.setAvatar(avatar)
      return ('Uuuh! Neues Avatar! 😍')
    } catch (error) {
      throw ('irgendwas is hier gerade explodiert.')
    }
  }
}

module.exports = Avatar
