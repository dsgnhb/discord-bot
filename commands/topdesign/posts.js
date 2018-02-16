const TopDesignCommand = require('../../base/commands/TopDesignCommand.js')

class Posts extends TopDesignCommand {
  constructor(client) {
    super(client, {
      name: 'posts',
      aliases: ['designs'],
      category: 'Top Design',
      description: 'Alle Posts für die du Voten kannst.',
      usage: 'posts',
      permLevel: 0
    })
  }

  async run(message) {
    try {
      const request = await this.f.getPosts()
      if (!request) throw ('**TopDesign** | Es wurden für diesen Monat noch keine Designs eingeschickt.')
      let posts = ''
      for (let i = 0; i < request.length; i++) {
        let entry = request[i]
        posts += '**#' + entry.id + '** | ' + entry.username + '  -  **' + entry.likes + '** ' + this.f.voteOrVotes(entry.likes) + '\n'
      }
      return ('**TopDesign** | Alle aktiven Posts findest du hier: https://designhub.fun/topdesign \n\n' + posts + '\nNutze `!vote #id` um für einen Post zu voten.')
    } catch (error) {
      console.log(error)
      throw ('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
    }
  }
}

module.exports = Posts
