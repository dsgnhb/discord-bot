const request = require('request')
const topdesign = require('../functions/topdesign.js')
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
  let url = client.config.apiEndpoint + '/topdesign/voted/' + message.author.id
  request.get({
    url: url,
    json: true,
    headers: { 'Token': client.config.tokens.api}
  }, function (error, response, body) {
    if (!body) return message.channel.send('**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕')
    const timeshort = topdesign.timeshort(new Date())
    if (!body.hasOwnProperty(timeshort)) return message.channel.send('**TopDesign** | Du hast diesen Monat für noch keinen Post gevoted.')
    const month = body[timeshort]
    let liked = ''
    for (let i = 0; i < month.length; i++) {
      let entry = month[i]
      if (month.length > 1) {
        if (i == month.length) {
                    // LAST ITEM
          liked += 'und **#' + entry.id + '** '
        } else if (i == month.length - 1) {
                    // SECOND-LAST ITEM
          liked += '**#' + entry.id + '** '
        } else {
          liked += '**#' + entry.id + '**, '
        }
      } else {
                // ONE ITEM
        liked += '**#' + entry.id + '**'
      }
    }
    message.channel.send('**TopDesign** | Du hast diesen Monat für ' + liked + ' gevoted.')
  })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['votes', 'likes'],
  permLevel: 0
}

exports.help = {
  name: 'voted',
  category: 'Top Design',
  description: 'Like. Like. Like. - Äh hab ich das jz schon geliket? (Tobi)',
  usage: 'voted'
}
