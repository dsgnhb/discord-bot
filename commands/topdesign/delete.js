const TopDesignCommand = require('../../base/commands/TopDesignCommand.js')

class Delete extends TopDesignCommand {
  constructor(client) {
    super(client, {
      name: 'delete',
      category: 'Top Design',
      description: 'Löscht halt Posts. (nein.doch.oah.)',
      usage: 'delete #<postid>',
      permLevel: 9
    })
  }

  async run(message, args) {
    const postID = this.getPostID(args)
    if (!postID) return message.channel.send('**TopDesign** | Nutze `!delete #[Nr des Posts]` um einen Post zu löschen.')
    try {
      const request = await this.deletePost(postID)
      if (!request) return message.channel.send(`**TopDesign** | Der Post mit der Nummer **#${postID}** konnte nicht gefunden werden.`)
      message.channel.send('**TopDesign** | Der Post mit der Nummer **#' + postID + '** wurde erfolgreich gelöscht.')
    } catch (error) {
      console.log(error)
      message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
    }
  }
}

module.exports = Delete
