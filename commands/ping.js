exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
  const msg = await message.channel.send('Ping?')
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'ping',
  category: 'Utility',
  description: 'Ping. Dann Pong.. Aber nicht Ping Pong.',
  usage: 'ping'
}
