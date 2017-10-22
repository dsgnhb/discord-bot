const Command = require('../../base/commands/Command.js')

class Reboot extends Command {
  constructor(client) {
    super(client, {
      name: 'reboot',
      aliases: ['restart'],
      category: 'System',
      description: 'Wenn alles nicht mehr klappt.. einfach neustart',
      usage: 'reboot',
      permLevel: 10
    })
  }

  async run(message, args) {
    try {
      await message.channel.send("Gut' Nacht, Leude!")
      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd)
      })
      process.exit(1)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = Reboot
