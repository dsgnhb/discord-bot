const Monitor = require('../base/monitors/Monitor.js')

class Ops extends Monitor {
  constructor(client) {
    super(client, {
      name: 'Opinions',
      description: 'Reagiert mit einem Daumen-Hoch-Smiley auf jedem Design',
      category: 'Design',
      dm: false
    })
  }

  async run(message, args) {
    if (!message.channel.id === '308681144914673675') return
    const opsMessages = ['ops', 'opinions', 'meinungen', 'meinung', 'wip', 'work in progress']
    if (!new RegExp(opsMessages.join('|')).test(message.content.toLowerCase())) return
    message.react('👍')
    this.client.log('log', `Added Reaction an Message from ${message.author.username} (${message.author.id})`, 'OPS')
  }
}

module.exports = Ops
