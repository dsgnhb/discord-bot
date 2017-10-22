class Command {
  constructor(client, { name = '', description = 'Keine Beschreibung.', category = 'Basics', usage = 'Nutzung nicht definiert.', dm = true, guild = true, aliases = new Array(), permLevel = '0' }) {
    this.client = client
    this.conf = { dm, guild, aliases, permLevel }
    this.help = { name, description, category, usage }
  }
}
module.exports = Command
