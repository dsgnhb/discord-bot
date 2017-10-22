const LevelsMonitor = require('../base/monitors/LevelsMonitor.js')

class Levels extends LevelsMonitor {
  constructor(client) {
    super(client, {
      name: 'Levels',
      description: 'XPPPP.'
    })
  }

  async run(message, args) {
    if (!this.client.cooldown.has(message.author.id)) {
      const settings = message.settings
      if (message.content.startsWith(settings.prefix)) return
      if (this.client.config.levelSystem === false) {
        this.client.log('log', `Levels System disabled! Could not give XP to ${message.author.username} (${message.author.id})!`, 'Levels')
      } else {
        this.addXP(message.author)
      }
    } else {
      return
    }
    this.client.cooldown.add(message.author.id)
    setTimeout(() => {
      this.client.cooldown.delete(message.author.id)
    }, 60 * 1000)
  }
}

module.exports = Levels
