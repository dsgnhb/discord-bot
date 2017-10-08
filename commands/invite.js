exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
  message.channel.send('https://discordapp.com/invite/PGv5TR3')
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'invite',
  category: 'Info',
  description: 'Hier is leider keine Magie. Nur ein Link. :(',
  usage: 'invite'
}
