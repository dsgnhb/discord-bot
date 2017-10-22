module.exports = class {
  constructor(client) {
    this.client = client
  }
  async run(guild) {
    this.client.settings.set(guild.id, this.client.config.defaultSettings)
  }
}
