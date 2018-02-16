const Command = require('../../base/commands/Command.js')

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['pong'],
      category: 'Info',
      description: 'Ping. Dann Pong.. Aber nicht Ping Pong.',
      usage: 'ping',
      dm: true,
      guild: true,
      permLevel: 0
    })
  }

  async run(message) {
    try {
      const msg = await message.channel.send('Ping?')
      msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(this.client.ping)}ms`)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = Ping
