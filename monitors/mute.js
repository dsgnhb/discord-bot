exports.run = (client, message, level) => {
  if (client.mutes.has(message.author.id)) {
    return message.delete()
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false
}

exports.help = {
  name: 'Mutes',
  description: 'Monitor for Mute System.'
}
