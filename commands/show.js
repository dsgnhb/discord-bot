const request = require('request')
const topdesign = require('../functions/topdesign.js')
const { Attachment } = require('discord.js')
exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-lets
  let postid = args[0]
  if (!postid) return message.channel.send('**TopDesign** | Nutze `!show #[Nr des Posts]` um einen Post zu sehen.')
  if (postid.startsWith('#')) postid = postid.substring(1, 20)
  postid = Number(postid)
  if (!postid) return message.channel.send('**TopDesign** | Nutze `!show #[Nr des Posts]` um einen Post zu sehen.')
  let url = client.config.apiEndpoint + '/topdesign/posts/' + postid
  request.get(
    {
      url: url,
      json: true,
      headers: { Token: client.config.tokens.api }
    },
    function(error, response, body) {
      if (error) console.log(error)
      if (!body) return message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
      if (body.error) return message.channel.send('**TopDesign** | Das Design mit der Nummer **#' + postid + '** konnte nicht gefunden werden.')
      message.channel.send(`**TopDesign** | ${body.username} - **${body.likes}** ${topdesign.voteOrVotes(body.likes)}`, new Attachment(body.image, 'design.jpg'))
    }
  )
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'show',
  category: 'Top Design',
  description: 'Design.',
  usage: 'show #<postid>'
}
