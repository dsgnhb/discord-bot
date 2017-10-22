const Command = require('../../base/commands/Command.js')

class Avatar extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      aliases: [],
      category: 'System',
      description: 'Neues Avatar',
      usage: 'avatar <url>',
      dm: false,
      guild: true,
      permLevel: 10
    })
  }

  async run(message, args) {
    let avatar = args[0] || ''
    if (!avatar.startsWith('https://')) return message.channel.send('Joa. Des is aber kein Link!')
    try {
      await this.client.user.setAvatar(avatar)
      message.channel.send('Uuuh! Neues Avatar! 😍')
    } catch (error) {
      message.channel.send('irgendwas is hier gerade explodiert.')
    }
  }
}

module.exports = Avatar
