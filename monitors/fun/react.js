const Monitor = require('../../base/monitors/LevelsMonitor.js')

class React extends Monitor {
  constructor(client) {
    super(client, {
      name: 'React',
      description: 'Reagiert auf ALLES',
      category: 'Fun'
    })
  }

  async run(message) {
    const reactions = {
      Marianne: {
        input: ['schokolade', 'dome'],
        output: ['Was denn HIER los?!!', 'Was das denn HIER??!', 'Was machst du DENN??!'],
        cost: 0
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
        ],
        cost: 0
      },
      GommeHD: {
        input: ['/gommemode'],
        output: ['_***trololol!***_'],
        cost: 10
      }
    }

    let possibleKeys = Object.keys(reactions).filter(k => reactions[k].input.some(word => message.content.toLowerCase().includes(word.toLowerCase())))

    if (!possibleKeys.length > 0) return
    const name = possibleKeys[0]
    const character = reactions[name]

    let donatorRole = message.guild.roles.find("name", "donator");
    if (message.guild && !(message.author.permLevel > 9 || (donatorRole && message.member.roles.has(donatorRole.id))) && character.cost > 0) {
      const removeCoins = await this.f.removeCoins(message.member, character.cost)
      if (!removeCoins) return message.reply('Du hast leider nicht genug Coins!')
    }

    const randomStatement = character.output.random()
    if (message.guild.available) message.guild.members.get(this.client.user.id).setNickname(name)
    await message.channel.send(randomStatement)
    if (message.guild.available) message.guild.members.get(this.client.user.id).setNickname('designhub')

    this.client.log('log', `${name} reacted on ${message.author.username}'s (${message.author.id}) message with answer "${randomStatement}"`, 'React')

  }
}

module.exports = React
