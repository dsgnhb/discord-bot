const express = require('express')

module.exports = client => {
  const app = express()
  app.get('/', function(req, res) {
    res.send(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`)
  })

  app.listen(1111, function() {
    client.log('log', 'Dashboard listening on port 1111!', 'Dashboard')
  })
}
