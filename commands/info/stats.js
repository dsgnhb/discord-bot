const Command = require('../../base/commands/Command.js')

const moment = require('moment')
require('moment-duration-format')
const { version } = require('discord.js')
const { RichEmbed } = require('discord.js')

class Stats extends Command {
  constructor(client) {
    super(client, {
      name: 'stats',
      category: 'Info',
      description: 'Nein. Unser Bot läuft auf keiner Kartoffel!',
      usage: 'stats',
      dm: false
    })
  }

  async run(message) {
    const settings = message.settings
    const duration = moment.duration(this.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]')

    return (
      new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.avatarURL)
        .setColor(settings.embedColor)
        .addField('Mem Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
        .addField('Uptime', duration, true)
        .addField('Users', this.client.users.size.toLocaleString(), true)
        .addField('Servers', this.client.guilds.size.toLocaleString(), true)
        .addField('Channels', this.client.channels.size.toLocaleString(), true)
        .addField('Discord.js', version, true)
        .addField('Node.js', process.version, true)
        .setTimestamp()
        .setFooter(settings.embedFooter, settings.embedIcon)
    )
  }
}

module.exports = Stats
