const TopDesignCommand = require('../../base/commands/TopDesignCommand.js')

class Topdesign extends TopDesignCommand {
  constructor(client) {
    super(client, {
      name: 'topdesign',
      category: 'Top Design',
      description: 'Äh? Was is "Top Design"?',
      usage: 'topdesign',
      aliases: ['topdesigns'],
      permLevel: 0
    })
  }

  async run(message) {
    throw 'Füge den Hashtag `#topdesign` zu deinem Design hinzu, um es für die Bewertung freizugeben. \nNutze `!vote` um einen Post zu liken oder `!posts` für eine Übersicht alles Posts. \nhttps://youtu.be/Ei_QI8gbkss'
  }
}

module.exports = Topdesign
