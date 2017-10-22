const Monitor = require('../../base/monitors/Monitor.js')

class BlockWords extends Monitor {
  constructor(client) {
    super(client, {
      name: 'Block Words',
      description: 'Blockiert einfach alles.',
      category: 'System',
      maxPermLevel: 8
    })
  }

  async run(message, args) {
    // Fordbidden Words
    const swearWords = ['shucks', 'frak', 'shite']
    if (swearWords.some(word => message.content.includes(word))) {
      message.delete().then(() => this.client.log('log', `${message.author.username} (${message.author.id}) said a blocked word!`, 'Bad Words'))
    }

    // Allowed Invites
    const allowedLinks = ['https://discordapp.com/invite/PGv5TR3', 'https://discord.gg/PGv5TR3']
    if (allowedLinks.some(word => message.content.includes(word))) return

    // Forbidden Invites
    const forbiddenLinks = ['discord.gg', 'discord.io', 'discord.me', 'discord.li', 'discordapp.com/invite/']
    if (forbiddenLinks.some(word => message.content.includes(word))) {
      message.delete().then(() => this.client.log('log', `${message.author.username} (${message.author.id}) sent an invite (${message.content})!`, 'AD'))
    }
  }
}

module.exports = BlockWords
