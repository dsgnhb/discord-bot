const LevelsMonitor = require('../../base/monitors/LevelsMonitor.js')

class Levels extends LevelsMonitor {
  constructor(client) {
    super(client, {
      name: 'Levels',
      description: 'XPPPP.'
    })
  }

  async run(message, args) {
    if (this.client.cooldown.has(message.author.id)) return

      const settings = message.settings
      if (message.content.startsWith(settings.prefix)) return
      if (this.client.config.levelSystem === false) {
        this.client.log('log', `Levels System disabled! Could not give XP to ${message.author.username} (${message.author.id})!`, 'Levels')
      } else {
        this.f.addXP(message.author)
        if (message.content.includes('<:gomme:313418733861470210>')) this.f.addCoins(message.author, 1)
      }
    this.client.cooldown.add(message.author.id)
    setTimeout(() => {
      this.client.cooldown.delete(message.author.id)
    }, 60 * 1000)
  }
}

module.exports = Levels
