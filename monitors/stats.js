exports.run = (client, message, level) => {
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings
  if (message.content.startsWith(settings.prefix)) return
  const now = new Date()
  const date = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`
  const stats = client.stats.get(date) || { messages: 0 }
  stats.messages++
  client.stats.set(date, stats)
}
exports.conf = {
  enabled: true,
  guildOnly: true
}

exports.help = {
  name: 'Stats',
  description: 'Tracks average of messages per day'
}
