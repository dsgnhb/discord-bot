const Event = require('../base/events/Event.js')

class Error extends Event {
  constructor(client) {
    super(client)
  }
  async run(e) {
    this.client.log('error', e)
  }
}
module.exports = Error
