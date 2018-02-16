const Command = require('../../base/commands/Command.js')

class AvatarURL extends Command {
  constructor(client) {
    super(client, {
      name: 'avatarurl',
      aliases: [],
      category: 'System',
      description: 'Neues Avatar',
      usage: 'avatarurl @user',
      dm: false,
      guild: false,
      permLevel: 0
    })
  }

  async run(message) {
    let user = message.mentions.users.first() || message.author
    return (`${user}'s Avatar: \n${user.displayAvatarURL}`)
  }
}

module.exports = AvatarURL
