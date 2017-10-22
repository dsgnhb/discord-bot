module.exports = class {
  constructor(client) {
    this.client = client
  }
  async run(member) {
    this.client.log('Log', `${member.displayName} (${member.id}) left the Server!`, '-')
  }
}
