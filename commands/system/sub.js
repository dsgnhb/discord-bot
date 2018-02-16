const Command = require('../../base/commands/Command.js')

class Sub extends Command {
  constructor(client) {
    super(client, {
      name: 'sub',
      aliases: ['subscribe', 'sup'],
      category: 'System',
      description: 'Du bist hyped auf designhub? Mit @subscriber bleibst du immer up-to-date!',
      usage: 'sub',
      dm: false,
      permLevel: 0
    })
  }

  async run(message) {
    const role = message.guild.roles.find('name', 'subscriber')
    if (!role) throw ('DREGGS SERVER! HIER GIBST NEDMAL NE SUBSCRIBER ROLE!')
    if (message.member.roles.has(role.id)) {
      await message.member.removeRole(role, '!sub')
      return ('**Schade..** Du erhälst nun **keine Neuigkeiten** mehr. 😞')
    } else {
      await message.member.addRole(role, '!sub')
      return ('**Whoooo!** Mit der **Subscriber-Role** bleibst du absofort immer **up-to-date**! 📣')
    }
  }
}

module.exports = Sub

