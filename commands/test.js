exports.run = async (client, message, args, level) => {
  const members = message.guild.members.array()
  for (var i = 0; i < members.length; i++) {
    let member = members[i]
    // console.log(member.displayName)
    let avatar = member.user.displayAvatarURL
    let size = avatar.indexOf('?size')
    if (size !== -1) avatar = avatar.slice(0, size)
    console.log(`<img src="${avatar}" class="item">`)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
}

exports.help = {
  name: 'test',
  category: 'test',
  description: 'Test Command.',
  usage: 'test'
}
