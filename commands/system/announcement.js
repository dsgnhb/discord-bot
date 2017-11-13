const Command = require('../../base/commands/Command.js')

const ms = require('ms')

class Announcement extends Command {
  constructor(client) {
    super(client, {
      name: 'announcement',
      aliases: ['an', 'news'],
      category: 'System',
      description: 'NEWSSS.',
      usage: 'announcement <text...>',
      dm: false,
      permLevel: 9
    })
  }

  async run(message, args) {
    try {
      const role = message.guild.roles.find('name', 'subscriber')
      if (!role) return message.channel.send('DREGGS SERVER! HIER GIBST NEDMAL NE SUBSCRIBER ROLE!')

      const channel = message.guild.channels.find('name', 'updates')
      if (!channel) return message.channel.send("Hier gibt's keinen #updates-Channel")

      const text = args.join(' ')
      if (!text) return message.channel.send('Bin leider nicht so kreativ.. Was soll ich denn schreiben?')

      if (role.mentionable === false) await role.edit({ mentionable: true })
      const an = await channel.send(`${role}\n${text}`)
      await role.edit({ mentionable: false })

      const emojis = ['😍', '👍', '⭐', '🎉', '😏', '😜', '😇', '👍', '🙊', '🌆', '💪', '😎']
      let random = emojis
        .sort(function() {
          return parseInt(Math.random() * 10) % 2
        })
        .slice(0, this.client.randomNum(4, 7))
      for (var i = 0; i < random.length; i++) {
        await an.react(random[i])
      }

      await message.delete().catch(console.error)
      return message.channel.send('**Yeey** Dein Announcement wurde gepostet!')
    } catch (error) {
      throw error
    }
  }
}

module.exports = Announcement
