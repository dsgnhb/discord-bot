const request = require('request')
const topdesign = require('../functions/topdesign.js')
exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-lets
  let postid = args[0]
  if (!postid) return message.channel.send('**TopDesign** | Nutze `!vote #[Nr des Posts]` um für einen Post zu voten.')
  if (postid.startsWith('#')) postid = postid.substring(1, 20)
  postid = Number(postid)
  if (!Number.isInteger(postid)) return message.channel.send('**TopDesign** | Nutze `!vote #[Nr des Posts]` um für einen Post zu voten.')
  let url = client.config.apiEndpointDev + '/topdesign/vote/' + postid
  let body = {
    userid: message.author.id
  }
  request.post(
    {
      url: url,
      json: true,
      body: body,
      headers: { Token: client.config.tokens.api }
    },
    function(error, response, body) {
      if (error) console.log(error)
      if (!body) return message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
      if (body == 'Not found') return message.channel.send('**TopDesign** | Das Design mit der Nummer **#' + postid + '** konnte nicht gefunden werden.')
      if (body.action == 'remove')
        return message.channel.send('**TopDesign** | Dein Like wurde entfernt! Der Post von **' + body.posted_by + '** hat jetzt **' + body.likes + ' ' + topdesign.voteOrVotes(body.likes) + '**.')
      if (body.action == 'add')
        return message.channel.send('**TopDesign** | Dein Like wurde hinzugefügt! Der Post von **' + body.posted_by + '** hat jetzt **' + body.likes + ' ' + topdesign.voteOrVotes(body.likes) + '**.')
    }
  )
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['like'],
  permLevel: 0
}

exports.help = {
  name: 'vote',
  category: 'Top Design',
  description: 'LIIIIIKKEEEEESSSS',
  usage: 'vote #<postid>'
}
