const Command = require('../../base/commands/Command.js')

const ms = require('ms')

class Mute extends Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      category: 'Moderation',
      description: 'Ätsch! Da kannst du nichtmehr schreiben.',
      usage: 'mute <@user>',
      dm: false,
      permLevel: 9
    })
  }

  async run(message, args) {
    let toMute = message.guild.member(message.mentions.users.first())
    if (!toMute) return message.channel.send('Wen soll ich muten? Bin ja schon ganz aufgeregt ;)')
    if (toMute.id === message.author.id) return message.channel.send('Das bist doch du xd')
    const muteRole = message.guild.roles.find('name', 'Muted')
    if (!muteRole) return message.channel.send('DREGGS SERVER! HIER GIBST NEDMAL NE MUTE ROLE!')
    const time = args[1] || 60 * 1000

    if (toMute.roles.has(muteRole.id)) {
      toMute.removeRole(muteRole)
      return message.channel.send(`${toMute} wurde entmutet!`)
    }

    await toMute.addRole(muteRole)
    message.channel.send(`WapBap! ${toMute} wurde für ${ms(ms(time), { long: true })} gemutet!`)

    /* setTimeout(function() {
      toMute.removeRole(muteRole)
      message.channel.send(`Endlich! ${toMute} wurde entmutet!`)
    }, ms(time)) */
  }
}

module.exports = Mute
