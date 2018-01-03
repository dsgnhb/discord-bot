const Event = require('../base/events/Event.js')

class GuildCreate extends Event {
  constructor(client) {
    super(client)
  }
  async run(guild) {
    this.client.settings.set(guild.id, this.client.settings.get('default'))
  }
}
module.exports = GuildCreate
