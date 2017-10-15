exports.run = (client, message, args, level) => {
  // eslint-disable-line no-unused-lets
  message.reply(level)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'permlevel',
  category: 'Info',
  description: 'Deine Perms.',
  usage: 'permlevel'
}
