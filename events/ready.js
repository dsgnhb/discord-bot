module.exports = class {
  constructor(client) {
    this.client = client
  }

  async run() {
    await this.client.wait(1000)

    this.client.log('log', `${this.client.user.tag}, ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`, 'Ready!')

    // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
    this.client.guilds.filter(g => !this.client.settings.has(g.id)).forEach(g => this.client.settings.set(g.id, this.client.config.defaultSettings))

    this.client.user.setPresence({ game: { name: 'dsgnhb.de', type: 0 } })
  }
}
