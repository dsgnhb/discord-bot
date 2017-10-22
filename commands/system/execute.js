const Command = require('../../base/commands/Command.js')

const exec = require('child_process').exec

class Execute extends Command {
  constructor(client) {
    super(client, {
      name: 'execute',
      aliases: ['exec'],
      category: 'System',
      description: 'SSH',
      usage: 'execute <code>',
      dm: false,
      permLevel: 10
    })
  }

  async run(message, args) {
    exec(`${args.join(' ')}`, (error, stdout) => {
      const response = error || stdout
      message.channel.send(`**${message.content}**\n\`\`\`${response}\`\`\``, { split: true }).catch(console.error)
    })
  }
}

module.exports = Execute
