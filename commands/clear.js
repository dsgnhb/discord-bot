exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-lets
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
    await client.wait(2000)
    msg.delete()
  } catch (e) {
    client.log('Error', e)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 9
}

exports.help = {
  name: 'clear',
  category: 'Utility',
  description: 'Auch Channel muüssen aufgeräumt werden.',
  usage: 'clear <amount> (<@user>)'
}
