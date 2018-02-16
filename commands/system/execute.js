const Command = require('../../base/commands/Command.js')

const exec = require('child_process').exec

class Execute extends Command {
  constructor(client) {
    super(client, {
      name: 'execute',
      aliases: ['exe'],
      category: 'System',
      description: 'SSH',
      usage: 'execute <code>',
      dm: false,
      permLevel: 10
    })
  }

  async run(message) {
    const args = message.args
    exec(`${args.join(' ')}`, (error, stdout) => {
      const response = error || stdout
      return (`**${message.content}**\n\`\`\`${response}\`\`\``, { split: true }).catch(console.error)
    })
  }
}

module.exports = Execute
