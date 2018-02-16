const Command = require('../../base/commands/Command.js')

class Reload extends Command {
  constructor(client) {
    super(client, {
      name: 'reload',
      category: 'System',
      description: 'Bot neustarten? Nö. - Ich hab !reload (Daumen hoch)',
      usage: 'reload <command>',
      permLevel: 10
    })
  }

  async run(message) {
    const args = message.args
    if (!args || args.size < 1) return message.reply('Must provide a command to reload..')
    const commands = this.client.commands.get(args[0])

    let response = await this.client.unloadCommand(`${commands.conf.location}`, args[0])
    if (response) return message.reply(`Error Unloading: ${response}`)

    response = this.client.loadCommand(`${commands.conf.location}`, args[0])
    if (response) return message.reply(`Error loading: ${response}`)

    message.reply(`The command \`${args[0]}\` has been reloaded`)
  }
}
module.exports = Reload
