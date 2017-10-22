const Event = require('../base/events/Event.js')

class GuildMemberAdd extends Event {
  constructor(client) {
    super(client)
  }
  async run(member) {
    this.client.log('Log', `${member.displayName} (${member.id}) joined the Server!`, '+')
    let role = member.guild.roles.find(r => r.name.toLowerCase() === 'member')
    await member.addRole(role, 'Server join.')
    this.client.log('Log', `Given ${role.name} to ${member.displayName} (${member.id}).`, 'Role')
  }
}
module.exports = GuildMemberAdd
