const TopDesignCommand = require('../../base/commands/TopDesignCommand.js')

class Status extends TopDesignCommand {
  constructor(client) {
    super(client, {
      name: 'status',
      category: 'Top Design',
      description: 'Deaktivieren, nicht löschen, Lukas.',
      usage: 'status #<postid>',
      permLevel: 8
    })
  }

  async run(message) {
    const args = message.args
    const postID = this.f.getPostID(args)
    console.log(postID)
    if (!postID) throw '**TopDesign** | Nutze `!delete #[Nr des Posts]` um einen Post zu löschen.'
    try {
      const request = await this.f.statusPost(postID)
      if (!request) throw `**TopDesign** | Der Post mit der Nummer **#${postID}** konnte nicht gefunden werden.`
      if (request.action === 'deactivate')
        return `**TopDesign** | Der Post von **${request.posted_by}** mit der Nummer **#${postID}** wurde erfolgreich deaktiviert. Er hatte **${request.likes} ${this.f.voteOrVotes(request.likes)}**.`
      if (request.action === 'activate')
        return `**TopDesign** | Der Post von **${request.posted_by}** mit der Nummer **#${postID}** wurde erfolgreich aktiviert. Er hatte **${request.likes} ${this.f.voteOrVotes(request.likes)}**.`
    } catch (error) {
      console.log(error)
      throw '**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕'
    }
  }
}

module.exports = Status
