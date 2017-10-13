exports.run = async (client, message, level) => {
  if (message.channel.type !== 'text') return
  if (message.channel.id !== '219235194832551946') return

  const emojis = ['😍', '👍', '⭐', '🎉', '😏', '😜', '😇', '👍', '🙊', '🌆', '💪', '😎']
  const util = require('../functions/util.js')
  let random = emojis
    .sort(function() {
      return parseInt(Math.random() * 10) % 2
    })
    .slice(0, util.randomNum(4, 7))
  for (var i = 0; i < random.length; i++) {
    await message.react(random[i])
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true
}

exports.help = {
  name: 'React',
  description: 'React on #updates.'
}
