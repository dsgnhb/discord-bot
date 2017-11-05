const Command = require('../../base/commands/Command.js')

const { Collection } = require('discord.js')

class Join extends Command {
  constructor(client) {
    super(client, {
      name: 'join',
      category: 'System',
      description: 'Bekomme nen Rang ohne nen Admin vollzuspamen. - voll schlau von mir',
      usage: 'join role1 role2 ...',
      dm: false,
      guild: true,
      permLevel: 0
    })
  }

  async run(message, args) {
    const skillGroups = new Collection([
      [
        'developer',
        {
          name: 'Developer',
          id: '342719412744224768'
        }
      ],
      [
        'affinityphoto',
        {
          name: 'AffinityPhoto',
          id: '342719412744224768'
        }
      ],
      [
        'photoshop',
        {
          name: 'Photoshop',
          id: '342721244610822155'
        }
      ],
      [
        'aftereffects',
        {
          name: 'AfterEffects',
          id: '376718659940384769'
        }
      ],
      [
        'gimp',
        {
          name: 'Gimp',
          id: '342722021542854666'
        }
      ],
      [
        'paint',
        {
          name: 'Paint',
          id: '357609251964846080'
        }
      ],
      [
        'cinema4d',
        {
          name: 'Cinema4D',
          id: '342721168962486272'
        }
      ],
      [
        'blender',
        {
          name: 'Blender',
          id: '342721614875721728'
        }
      ],
      [
        'html/css',
        {
          name: 'HTML/CSS',
          id: '342728054436528128'
        }
      ],
      [
        'javascript',
        {
          name: 'Javscript',
          id: '342728624262217739'
        }
      ],
      [
        'php',
        {
          name: 'PHP',
          id: '342721563499560970'
        }
      ],
      [
        'java',
        {
          name: 'Java',
          id: '342721474777448459'
        }
      ],
      [
        'c#',
        {
          name: 'C#',
          id: '342723268983259137'
        }
      ],
      [
        'c++',
        {
          name: 'C++',
          id: '342976548552572929'
        }
      ],
      [
        'sql',
        {
          name: 'SQL',
          id: '342740582021464074'
        }
      ]
    ])
    const usage = `Nutze \`!join role1 role2 ...\` um einer der folgenden Skill-Gruppe beizutreten:\n \`${skillGroups.map(item => ` ${item.name}`)}\`.`

    if (args.length === 0) return message.reply(usage)

    let addedRanks = [],
      removedRanks = []

    const joinRole = async (rankString, message) => {
      rankString = rankString.toLowerCase()
      if (rankString === 'designer') return message.reply('Kontaktiere einen Owner, um den Designer-Rang zu erhalten!')

      let rank = skillGroups.get(rankString)
      if (!rank) return

      let role = message.guild.roles.get(rank.id)
      if (!role) return message.reply(`MEDDL! kann mal wer hier nen ${rank.name}-Rang erstellen?`)

      if (message.member.roles.has(role.id)) {
        try {
          await message.member.removeRole(role, 'Requested via !join.')
          removedRanks.push(rank.name)
        } catch (ex) {
          console.log(ex)
        }
      } else {
        try {
          await message.member.addRole(role, 'Requested via !join.')

          addedRanks.push(rank.name)
        } catch (ex) {
          console.log(ex)
        }
      }
    }

    for (let rankString of args) {
      await joinRole(rankString, message)
    }

    if (addedRanks.length > 0) {
      message.reply('Du wurdest zu den Gruppe(n) **' + addedRanks.join(', ') + '** hinzugefügt.')
      this.client.log(`Log`, `Added ${message.author.username} (${message.author.id}) to ${addedRanks.join(', ')}`)
    }
    if (removedRanks.length > 0) {
      message.reply('Du wurdest aus den Gruppe(n) **' + removedRanks.join(', ') + '** entfernt.')
      this.client.log(`Log`, `Removed ${message.author.username} (${message.author.id}) from ${removedRanks.join(', ')}`)
    }
  }
}

module.exports = Join
