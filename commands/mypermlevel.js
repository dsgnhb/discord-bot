exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
    message.channel.send(client.permLevel(message))
}
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  }
  
  exports.help = {
    name: 'mypermlevel',
    category: 'Info',
    description: 'Deine Perms.',
    usage: 'mypermlevel'
  }
  