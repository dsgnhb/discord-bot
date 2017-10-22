const TopDesignMonitor = require('../../base/monitors/TopDesignMonitor.js')

class TopDesign extends TopDesignMonitor {
  constructor(client) {
    super(client, {
      name: 'Stats',
      description: 'Tracket tägliche Nachrichten und Memberanzahl'
    })
  }

  async run(message, args) {
    if (!message.attachments.first()) return
    if (!message.isMentioned(message.guild.channels.find('name', 'topdesign')) || !message.content.includes('#topdesign')) return
    this.client.log('log', `${message.author.username} (${message.author.id}) ran #topdesign`, 'MONITOR')

    try {
      message.channel.startTyping()
      let image = message.attachments.first().proxyURL
      const request = await this.f.addPost(message.author, image)
      message.channel.stopTyping(true)

      client.log('log', `${message.author.username} (${message.author.id}) successfully submitted to #topdesign`, 'MONITOR')
      if (request.action === 'add') return message.channel.send('**TopDesign** | Dein Post wurde erfolgreich bei Top Design eingereicht. Er kann mit `!vote #' + request.postid + '` bewertet werden.')
    } catch (error) {
      console.log(error)
      message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
    }
  }
}

module.exports = TopDesign
