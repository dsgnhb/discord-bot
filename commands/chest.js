const Chests = require('../functions/chests.js')
exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-lets
  message.channel.send('Dann such ich mal... 🤔')
  const hasChests = await Chests.removeChests(client, message.author, 1)
  await client.wait(2000)
  if (!hasChests)
    return message.channel.send('Hm.. Hier steht keine Kiste mit deinem Namen.. 😕 \nKeine Angst, Kisten mit tollen Überraschungen erhälst du automatisch durch aktives Schreiben im Chat!')
  await message.channel.send('Puuuh, ist das hier staubig.. 🌙💨')
  await client.wait(3000)
  const item = Chests.getRandomChest()
  await message.channel.send('*knartz* 👥')
  await client.wait(1500)
  await message.channel.send(`**WHOOH!!** Du hast *${item.name}* gewonnen! 🎉 🎉 \n`)
  item.run(client, message)
  client.log('Log', `${message.author.username} (${message.author.id}) won "${item.name}"`)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['open', 'chest-open', 'chests'],
  permLevel: 0
}

exports.help = {
  name: 'chest',
  category: 'Levels',
  description: 'Oaah. Magie.',
  usage: 'chest'
}
