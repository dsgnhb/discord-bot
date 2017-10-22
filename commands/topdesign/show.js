const TopDesignCommand = require('../../base/commands/TopDesignCommand.js')

const { Attachment } = require('discord.js')

class Show extends TopDesignCommand {
  constructor(client) {
    super(client, {
      name: 'show',
      category: 'Top Design',
      description: 'Design.',
      usage: 'show #<postid>',
      permLevel: 0
    })
  }

  async run(message, args) {
    const postID = this.getPostID(args)
    if (!postID) return message.channel.send('**TopDesign** | Nutze `!delete #[Nr des Posts]` um einen Post zu löschen.')
    try {
      const request = await this.getPost(postID)
      if (!request) return message.channel.send(`**TopDesign** | Der Post mit der Nummer **#${postID}** konnte nicht gefunden werden.`)
      message.channel.send(`**TopDesign** | ${request.username} - **${request.likes}** ${this.voteOrVotes(request.likes)}`, new Attachment(request.image, 'design.jpg'))
    } catch (error) {
      console.log(error)
      message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
    }
  }
}

module.exports = Show
