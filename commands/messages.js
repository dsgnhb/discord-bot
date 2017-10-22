exports.run = async (client, message, args, level) => {
  let stats = client.stats.array()
  let totalMessages = 0
  for (let i = 0; i < stats.length; i++) {
    totalMessages += stats[i].messages
  }
  let average = Math.round(totalMessages / stats.length)

  if(average <1000){
    message.channel.send(`Da geht noch was: **${average} Nachrichten pro Tag**`)
  }
  else{
    message.channel.send(`Ganz schön viel Spam: **${average} Nachrichten pro Tag**`)
  }
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['spam'],
  permLevel: 1
}

exports.help = {
  name: 'messages',
  category: 'Info',
  description: 'So viel Spam.',
  usage: 'messages'
}
