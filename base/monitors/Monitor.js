class Monitor {
  constructor(client, options = { name = '', description = 'Keine Beschreibung.', category = 'Basics', dm = true, guild = true, maxPermLevel = '10' }) {
    this.client = client
    this.conf = { 
      dm: options.dm,
      guild: options.guild,
      maxPermLevel: options.maxPermLevel
    }
    this.help = {
      name: options.name,
      description: options.description,
      category: options.category
    }
  }
}
module.exports = Monitor
