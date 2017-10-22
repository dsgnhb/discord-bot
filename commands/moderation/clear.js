const Command = require('../../base/commands/Command.js')

class Clear extends Command {
  constructor(client) {
    super(client, {
      name: 'clear',
      category: 'Moderation',
      description: 'Auch Channel müssen aufgeräumt werden.',
      usage: 'clear <amount> (<@user>)',
      dm: true,
      guild: true,
      permLevel: 9
    })
  }

  async run(message, args) {
    const user = message.mentions.users.first()
    let amount = Number(args[0])
    if (!amount) return message.reply('Must specify an amount to delete!')
    if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!')
    if (amount > 50) amount = 50
    amount++
    try {
      let messages = await message.channel.fetchMessages({ limit: amount })
      if (user) {
        const filterBy = user ? user.id : client.user.id
        messages = messages
          .filter(m => m.author.id === filterBy)
          .array()
          .slice(0, amount)
      }
      await message.channel.bulkDelete(messages)
      amount--
      const msg = await message.channel.send('`Deleted ' + amount + ' messages.`')
      await this.client.wait(2000)
      msg.delete()
    } catch (e) {
      this.client.log('Error', e)
    }
  }
}

module.exports = Clear
