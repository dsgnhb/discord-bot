exports.run = async (client, message, args, level) => {
  let avatar = args[0] || ''
  if (!avatar.startsWith('https://')) return message.channel.send('WAS IS DAS DEN ')
  try {
    await client.user.setAvatar(avatar)
    message.channel.send('Uuuh! Neues Avatar! 😍')
  } catch (error) {
    message.channel.send('irgendwas is hier gerade explodiert.')
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 10
}

exports.help = {
  name: 'avatar',
  category: 'Info',
  description: 'Neues Avatar',
  usage: 'avatar'
}
