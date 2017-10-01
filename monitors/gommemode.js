exports.run = async (client, message, level) => {
  if (message.content.startsWith('/gommemode')) {
    let role = message.guild.roles.find(r => r.name === '/gommemode')
    if (!message.member.roles.has(role.id)) return
    message.guild.members.get(client.user.id).setNickname('GommeHD')
    message.channel.send('**trololol!**')
    client.log('log', `${message.author.username} (${message.author.id}) ran command /gommemode`, 'CMD')
    await client.wait(2000)
    message.guild.members.get(client.user.id).setNickname('dsgnhb')
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false
}

exports.help = {
  name: '/gommemode',
  description: 'trololol.'
}
