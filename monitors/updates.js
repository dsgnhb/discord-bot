exports.run = async (client, message, level) => {
  if (message.channel.type !== 'text') return
  if (message.channel.id !== '219235194832551946') return

  await message.react('😍')
  await message.react('👍')
  await message.react('🦄')
  await message.react('🎥')
  await message.react('⭐')
  await message.react('🎉')
  await message.react('😏')
  await message.react('⌚')
}

exports.conf = {
  enabled: true,
  guildOnly: true
}

exports.help = {
  name: 'React',
  description: 'React on #updates.'
}
