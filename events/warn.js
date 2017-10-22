const Event = require('../base/events/Event.js')

class Warn extends Event {
  constructor(client) {
    super(client)
  }

  async run() {
    client.log('warn', e)
  }
}

module.exports = Warn
