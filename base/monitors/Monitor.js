class Monitor {
  constructor(client, { name = '', description = 'Keine Beschreibung.', category = 'Basics', dm = true, guild = true, maxPermLevel = 10 }) {
    this.client = client
    this.conf = { dm, guild, maxPermLevel }
    this.help = { name, description, category }
  }
}
module.exports = Monitor