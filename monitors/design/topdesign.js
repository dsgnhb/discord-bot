const TopDesignMonitor = require('../../base/monitors/TopDesignMonitor.js')
const LevelsBase = require('../../base/base/LevelsBase.js')

class TopDesign extends TopDesignMonitor {
  constructor(client) {
    super(client, {
      name: 'TopDesign',
      description: 'Schick jetzt dein Design bei Top Design ein!'
    })
    this.levels = new LevelsBase(client)
  }

  async run(message, args) {
    if (!message.attachments.first()) return
    if (message.isMentioned(message.guild.channels.find('name', 'topdesign')) || message.content.includes('#topdesign')) {
      this.client.log('log', `${message.author.username} (${message.author.id}) ran #topdesign`, 'MONITOR')

      try {
        message.channel.startTyping()
        let image = message.attachments.first().proxyURL
        const request = await this.f.addPost(message.author, image)
        message.channel.stopTyping(true)

        if (request.action === 'double') return message.reply('Du für diesen Monat schon ein Design eingeschickt!')
        if (request.action === 'add') {
          this.levels.addCoins(message.author, 10)
          this.client.log('log', `${message.author.username} (${message.author.id}) successfully submitted to #topdesign`, 'MONITOR')
          return message.reply('Dein Post wurde erfolgreich bei Top Design eingereicht. Er kann mit `!vote #' + request.postid + '` bewertet werden.')
        }
      } catch (error) {
        console.log(error)
        message.channel.stopTyping(true)
        message.reply('Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
      }
    }
  }
}

module.exports = TopDesign
