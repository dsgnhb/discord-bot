exports.run = async (client, message, level) => {
  const reactions = {
    Marianne: {
      input: [ 'sahnekönigin', 'halt stop', 'jetzt hälst du die schnauze', 'sonst gibt krieg', 'käsefreund', 'sag ich dir gleich', 'es ist obst im haus', 'das bleibt alles so', 'ob du hier bist', 'beschweren kann man sich da eher weniger', 'schokolade', 'dome' ],
      output: [ 'Was den HIER los?!!', 'Was das den HIER??!', 'Was machst du DENN??!' ]
    },
    Andreas: {
      input: [ 'ich hab kein obst gefunden' ],
      output: [ 'Das Kinderzimmer ist sauber!', 'Halt stop' ]
    },
    GommeHD: {
      input: [ '/gommemode' ],
      output: [ '_***trololol!***_' ]
    }
  }

  let possibleKeys = Object.keys(reactions).filter(k => reactions[k].input.some(word => message.content.toLowerCase().includes(word)))
  if (possibleKeys.length > 0) {
    let name = possibleKeys[0]
    const randomOutput = reactions[name].output[Math.floor(Math.random() * reactions[name].output.length)]
    message.guild.members.get(client.user.id).setNickname(name)
    await message.channel.send(randomOutput)
    client.log('log', `${name} reacted on ${message.author.username}'s (${message.author.id}) message with answer "${randomOutput}"`, 'React')
    message.guild.members.get(client.user.id).setNickname('dsgnhb')
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true
}

exports.help = {
  name: 'React',
  description: 'React on EVERTHING.'
}
