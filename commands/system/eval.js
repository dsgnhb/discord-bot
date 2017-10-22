const Command = require('../../base/commands/Command.js')

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      category: 'System',
      description: 'Code',
      usage: 'eval <code>',
      dm: false,
      permLevel: 10
    })
  }

  async run(message, args) {
    const code = args.join(' ')
    try {
      const evaled = eval(code)
      const clean = await this.client.clean(this.client, evaled)
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``)
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await this.client.clean(this.client, err)}\n\`\`\``)
    }
  }
}

module.exports = Eval
