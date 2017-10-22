const TopDesignCommand = require('../../base/commands/TopDesignCommand.js')

class Vote extends TopDesignCommand {
  constructor(client) {
    super(client, {
      name: 'vote',
      aliases: ['like'],
      category: 'Top Design',
      description: 'LIIIIIKKEEEEESSSS',
      usage: 'vote #<postid>',
      permLevel: 0
    })
  }

  async run(message, args) {
    const postID = this.getPostID(args)
    if (!postID) return message.channel.send('**TopDesign** | Nutze `!vote #[Nr des Posts]` um für einen Post zu voten.')
    try {
      const request = await this.votePost(postID, message.author.id)
      if (!request) return message.channel.send(`**TopDesign** | Der Post mit der Nummer **#${postID}** konnte nicht gefunden werden.`)
      if (request.action == 'remove')
        return message.channel.send(`**TopDesign** | Dein Vote wurde entfernt! Der Post von **${request.posted_by}** hat jetzt **${request.likes} ${this.voteOrVotes(request.likes)}**.`)
      if (request.action == 'add')
        return message.channel.send(`**TopDesign** | Dein Vote wurde hinzugefügt! Der Post von **${request.posted_by}** hat jetzt **${request.likes} ${this.voteOrVotes(request.likes)}**.`)
    } catch (error) {
      console.log(error)
      message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
    }
  }
}

module.exports = Vote