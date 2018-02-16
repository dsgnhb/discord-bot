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

  async run(message) {
    const args = message.args
    const postID = this.f.getPostID(args)
    if (!postID) throw ('**TopDesign** | Nutze `!show #[Nr des Posts]` um einen Post zu betrachten.')
    try {
      const request = await this.f.getPost(postID)
      if (!request) throw (`**TopDesign** | Der Post mit der Nummer **#${postID}** konnte nicht gefunden werden.`)
      if (!request.active && message.author.permLevel < 9) {
        throw 'Du kannst dir dieses Design nicht ansehen, da es deaktiviert wurde'
      }
      const imageArray = request.image.split('.')
      const extention = imageArray[imageArray.length - 1]
      return (`**TopDesign** | ${request.username} - **${request.likes}** ${this.f.voteOrVotes(request.likes)}`, new Attachment(request.image, 'design.' + extention))
    } catch (error) {
      throw error
      //message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
    }
  }
}

module.exports = Show
