const Event = require('../base/events/Event.js')

class GuildMemberRemove extends Event {
  constructor(client) {
    super(client)
  }
  async run(member) {
    this.client.log('Log', `${member.displayName} (${member.id}) left the Server!`, '-')
  }
}
module.exports = GuildMemberRemove
