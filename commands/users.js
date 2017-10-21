exports.run = async (client, message, args, level) => {
  const stats = client.stats
  let msg = stats.map((prop, key) => {
    return `*${key}* - **${prop.member}** Member`
  })

  const statsKeys = client.stats.keyArray()
  const statsProp = client.stats.array()
  message.channel.send(msg.join(`\n`))
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'users',
  category: 'Info',
  description: 'SO VIELE MENSCHEN 😍',
  usage: 'users'
}
