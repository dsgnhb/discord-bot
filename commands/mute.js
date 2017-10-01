exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
  const user = message.mentions.users.first()
  let time = args[1]
  if (!user) return message.channel.send('Nutze `!mute <@user> (<time>)` um einen User temorär aus dem Chat auszuschließen.')
  if (!time) time = 60
  time = time * 1000
  if (client.mutes.has(user.id)) {
    client.mutes.delete(user.id)
    message.channel.send(`${user} wurde entmuted.`)
  } else {
    client.mutes.add(user.id)
    message.channel.send(`${user} wurde für ${time / 1000}s gemuted.`)
    setTimeout(() => {
      client.mutes.delete(user.id)
      message.channel.send(`${user} wurde entmuted.`)
    }, time)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 9
}

exports.help = {
  name: 'mute',
  category: 'Utility',
  description: 'Ätsch! Da kannst du nichtmehr schreiben.',
  usage: 'mute <@user>'
}
