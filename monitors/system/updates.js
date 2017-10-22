const Monitor = require('../../base/monitors/Monitor.js')

class Updates extends Monitor {
  constructor(client) {
    super(client, {
      name: 'Updates',
      description: 'Reagiert auf Nachrichten in #updates',
      category: 'System',
      dm: false
    })
  }

  async run(message, args) {
    if (message.channel.type !== 'text') return

    const updatesChannel = message.guild.channels.find('name', 'updates') || message.guild.channels.find('name', 'announcements')
    if (message.channel.id !== updatesChannel.id) return

    const emojis = ['😍', '👍', '⭐', '🎉', '😏', '😜', '😇', '👍', '🙊', '🌆', '💪', '😎']
    let random = emojis
      .sort(function() {
        return parseInt(Math.random() * 10) % 2
      })
      .slice(0, this.randomNum(4, 7))
    for (var i = 0; i < random.length; i++) {
      await message.react(random[i])
    }
  }
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}

module.exports = Updates
