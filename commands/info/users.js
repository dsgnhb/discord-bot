const Command = require('../../base/commands/Command.js')

class Messages extends Command {
  constructor(client) {
    super(client, {
      name: 'users',
      category: 'Info',
      description: 'SO VIELE MENSCHEN 😍',
      usage: 'users',
      dm: true,
      guild: true,
      permLevel: 0
    })
  }

  async run(message, args) {
    const stats = this.client.stats
    let msg = stats.map((prop, key) => {
      return `*${key}* - **${prop.member}** Member`
    })
    message.channel.send(msg.join(`\n`))
  }
}

module.exports = Messages
