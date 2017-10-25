const TopDesignCommand = require('../../base/commands/TopDesignCommand.js')

class Voted extends TopDesignCommand {
  constructor(client) {
    super(client, {
      name: 'voted',
      aliases: ['votes', 'likes'],
      category: 'Top Design',
      description: 'Like. Like. Like. - Äh hab ich das jz schon geliket? (Tobi)',
      usage: 'voted',
      permLevel: 0
    })
  }

  async run(message, args) {
    try {
      const request = await this.f.getVoted(message.author.id, this.f.timeshort(new Date()))
      if (!request) return message.channel.send('**TopDesign** | Du hast diesen Monat für noch keinen Post gevoted.')
      let output = ''
      message.channel.send(`**TopDesign** | Du hast diesen Monat für ${request.map(r => r.id).join(', ')} gevoted.`)
    } catch (error) {
      console.log(error)
      message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
    }
  }
}

module.exports = Voted
