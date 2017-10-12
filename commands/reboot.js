exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  await message.channel.send(`Meddl! Ich starte jz mal neu!`)
  client.log('log', 'Rebooting now.', 'Reboot')
  process.exit(1)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
}

exports.help = {
  name: 'reboot',
  category: 'System',
  description: 'Wenn alles nicht mehr klappt.. einfach neustart',
  usage: 'reboot'
}
