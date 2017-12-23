const Event = require('../base/events/Event.js')

const { RichEmbed } = require('discord.js')

class MessageReactionAdd extends Event {
  constructor(client) {
    super(client)
  }
  async run(reaction, user) {
    if (user.id === this.client.user.id) return

    if (reaction.emoji.name !== '⭐' || reaction.count > 1) return

    const message = reaction.message

    if (!message.guild) return
    if (message.author.bot) return
    // if (!message.guild.members.get(user.id).roles.find('name', 'owner')) return

    const channel = message.guild.channels.find('name', 'starboard')
    if (!channel) return message.reply('DREGGS SERVER! HIER GIBST NEDMAL NEN STARBOARD CHANNEL!')
    if (message.channel.id == channel.id) return

    const embed = new RichEmbed()
      .setAuthor(message.member.displayName, message.author.avatarURL)
      .setDescription(message.content)
      .setColor('GOLD')
      .setFooter(message.createdAt)
      .setTitle(`⭐ | #${message.channel.name}`)

    channel.send(embed)
  }
}
module.exports = MessageReactionAdd
