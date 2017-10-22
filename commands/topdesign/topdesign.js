const TopDesignCommand = require('../../base/commands/TopDesignCommand.js')

class Topdesign extends TopDesignCommand {
  constructor(client) {
    super(client, {
      name: 'topdesign',
      category: 'Top Design',
      description: 'Äh? Was is "Top Design"?',
      usage: 'topdesign',
      permLevel: 0
    })
  }

  async run(message, args) {
    message.channel.send(
      '**TopDesign** | Füge den Hashtag `#topdesign` zu deinem Design hinzu, um es für die Bewertung freizugeben. \nNutze `!vote` um einen Post zu liken, `!delete` um ihn zu löschen oder `!posts` für eine Übersicht alles Posts.'
    )
  }
}

module.exports = Topdesign
