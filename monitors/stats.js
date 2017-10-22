const Monitor = require('../base/monitors/Monitor.js')

class Stats extends Monitor {
  constructor(client) {
    super(client, {
      name: 'Stats',
      description: 'Tracket tägliche Nachrichten und Memberanzahl',
      category: 'System',
      dm: false
    })
  }

  async run(message, args) {
    const settings = message.settings
    if (message.content.startsWith(settings.prefix)) return
    const now = new Date()
    const date = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`
    const stats = this.client.stats.get(date) || { messages: 0, member: 0 }
    stats.messages++
    stats.member = message.guild.memberCount
    this.client.stats.set(date, stats)
  }
}

module.exports = Stats
