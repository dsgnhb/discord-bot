const { RichEmbed } = require('discord.js')
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings
  const embed = new RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor(settings.embedColor)
      .addField('Owner', `${message.guild.owner.user.tag} (${message.guild.owner.id})`, false)
      .addField('Member Count', `${message.guild.memberCount} (${message.guild.members.filter(m => m.user.bot).size} bots)`, true)
      .addField('Location', message.guild.region, true)
      .addField('Created', message.guild.createdAt.toLocaleString(), true)
      .addField('Roles', message.guild.roles.size, true)
      .setTimestamp()
      .setFooter(settings.embedFooter, settings.embedIcon)
  message.channel.send({embed}).catch(e => console.error(e))
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['serverstats', 'guildinfo', 'guildstats'],
  permLevel: 0
}

exports.help = {
  name: 'serverinfo',
  category: 'Info',
  description: 'Ja, hier sieht man auch den die Anzahl der Member.',
  usage: 'serverinfo'
}
