const Event = require('../base/events/Event.js')

class GuildDelete extends Event {
  constructor(client) {
    super(client)
  }
  async run(guild) {
    this.client.settings.delete(guild.id)
  }
}
module.exports = GuildDelete
