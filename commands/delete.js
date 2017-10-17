const request = require('request')
const topdesign = require('../functions/topdesign.js')
exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-lets
  let postid = args[0]
  if (!postid) return message.channel.send('**TopDesign** | Nutze `!delete #[Nr des Posts]` um einen Post zu löschen.')
  if (postid.startsWith('#')) postid = postid.substring(1, 20)
  postid = Number(postid)
  if (!postid) return message.channel.send('**TopDesign** | Nutze `!delete #[Nr des Posts]` um einen Post zu löschen.')
  if (!Number.isInteger(postid)) return message.channel.send('**TopDesign** | Is ' + postid + ' ne Zahl? lol')
  let url = client.config.apiEndpoint + '/topdesign/posts/' + postid
  request.del(
    {
      url: url,
      json: true,
      headers: { Token: client.config.tokens.api }
    },

    function(error, response, body) {
      if (error) console.log(error)
      if (!body) return message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
      if (body == 'Not found') return message.channel.send('**TopDesign** | Das Design mit der Nummer **#' + postid + '** konnte nicht gefunden werden.')
      console.log(body)
      if (body.action == 'delete') return message.channel.send('**TopDesign** | Der Post mit der Nummer **#' + postid + '** wurde erfolgreich gelöscht.')
    }
  )
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 9
}

exports.help = {
  name: 'delete',
  category: 'Top Design',
  description: 'Löscht halt Posts. (nein.doch.oah.)',
  usage: 'delete #<postid>'
}
