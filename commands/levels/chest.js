const LevelsCommand = require('../../base/commands/LevelsCommand.js')

class Chest extends LevelsCommand {
  constructor(client) {
    super(client, {
      name: 'chest',
      aliases: ['open', 'chest-open', 'chests'],
      description: 'Oaah. Magie.',
      usage: 'chest'
    })
  }

  async run(message, args) {
    try {
      message.channel.send('Dann such ich mal... 🤔')

      const hasChests = await this.removeChests(message.author, 1)
      if (!hasChests)
        return message.channel.send('Hm.. Hier steht keine Kiste mit deinem Namen.. 😕 \nKeine Angst, Kisten mit tollen Überraschungen erhälst du automatisch durch aktives Schreiben im Chat!')

      await this.client.wait(2000)
      await message.channel.send('Puuuh, ist das hier staubig.. 🌙💨')

      await this.client.wait(3000)
      await message.channel.send('*knartz* 👥')

      const item = this.getRandomChest()

      await this.client.wait(1500)
      await message.channel.send(`**WHOOH!!** Du hast *${item.name}* gewonnen! 🎉 🎉 \n`)

      item.run(message)
      this.client.log('Log', `${message.author.username} (${message.author.id}) won "${item.name}"`)
    } catch (error) {
      console.log(error)
      message.channel.send('**Levels** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
    }
  }
}

module.exports = Chest
