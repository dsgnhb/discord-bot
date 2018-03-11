const TopDesignCommand = require('../../base/commands/TopDesignCommand.js')

class Delete extends TopDesignCommand {
  constructor(client) {
    super(client, {
      name: 'delete',
      category: 'Top Design',
      description: 'Löscht halt Posts. (nein.doch.oah.)',
      usage: 'delete #<postid>',
      permLevel: 8
    })
  }

  async run(message) {
    const args = message.args
    const postID = this.f.getPostID(args)
    if (!postID) throw '**TopDesign** | Nutze `!delete #[Nr des Posts]` um einen Post zu löschen.'
    try {
      const request = await this.f.deletePost(postID)
      if (!request) throw `**TopDesign** | Der Post mit der Nummer **#${postID}** konnte nicht gefunden werden.`
      return '**TopDesign** | Der Post mit der Nummer **#' + postID + '** wurde erfolgreich gelöscht.'
    } catch (error) {
      console.log(error)
      return '**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕'
    }
  }
}

module.exports = Delete
