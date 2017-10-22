const Monitor = require('../base/monitors/Monitor.js')

class React extends Monitor {
  constructor(client) {
    super(client, {
      name: 'React',
      description: 'Reagiert auf ALLES',
      category: 'Fun'
    })
  }

  async run(message, args) {
    //'beschweren kann man sich da normalerweise eher weniger',
    const reactions = {
      Marianne: {
        input: ['schokolade', 'dome'],
        output: ['Was denn HIER los?!!', 'Was das denn HIER??!', 'Was machst du DENN??!']
      },
      Andreas: {
        input: ['ich hab kein obst gefunden', 'halt stop', 'jetzt hälst du die schnauze', 'es ist obst im haus', 'das bleibt alles so', 'ob du hier bist'],
        output: [
          'Das Kinderzimmer ist sauber!',
          'Halt stop',
          "Das bleibt alles so, wie's hier ist!",
          'Sonst gibts Krieg!',
          'Es ist Obst im Haus!',
          'Beruhigt habe ich mich jetzt nicht!',
          'Ne, jetzt hälst Du mal die Schnauze!',
          'Hochnäsige Zicke!',
          'Bei uns wird 2x in der Woche frisch gewischt'
        ]
      },
      GommeHD: {
        input: ['/gommemode'],
        output: ['_***trololol!***_']
      }
    }

    let possibleKeys = Object.keys(reactions).filter(k => reactions[k].input.some(word => message.content.toLowerCase().includes(word)))
    if (possibleKeys.length > 0) {
      let name = possibleKeys[0]
      const randomOutput = reactions[name].output[Math.floor(Math.random() * reactions[name].output.length)]

      const guild = message.guild
      if (guild.available) guild.members.get(client.user.id).setNickname(name)
      await message.channel.send(randomOutput)
      this.client.log('log', `${name} reacted on ${message.author.username}'s (${message.author.id}) message with answer "${randomOutput}"`, 'React')
      if (guild.available) guild.members.get(client.user.id).setNickname('designhub')
    }
  }
}

module.exports = React
