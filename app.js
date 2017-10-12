if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')

const Discord = require('discord.js')
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)
const Enmap = require('enmap')
const EnmapLevel = require('enmap-level')

const client = new Discord.Client()

client.config = require('./configs/config.json')
require('./functions/functions.js')(client)

client.commands = new Enmap()
client.aliases = new Enmap()
client.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) })
client.stats = new Enmap({ provider: new EnmapLevel({ name: 'stats' }) })
client.cooldown = new Set()
client.mutes = new Set()

const init = async () => {
  const cmdFiles = await readdir('./commands/')
  console.log(`[log] [Log] Loading a total of ${cmdFiles.length} commands.`)
  cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`)
      if (f.split('.').slice(-1)[0] !== 'js') return
      // console.log(`[log] [Log] Loading Command: ${props.help.name}.`);
      client.commands.set(props.help.name, props)
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name)
      })
    } catch (e) {
      console.log(`[warn] [Error] Unable to load command ${f}: ${e}`)
      console.log(e)
    }
  })
  const evtFiles = await readdir('./events/')
  console.log(`[log] [Log] Loading a total of ${evtFiles.length} events.`)
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0]
    const event = require(`./events/${file}`)
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
  })
  client.login(client.config.tokens.discord)
}

init()
