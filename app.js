if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.')

const { Client } = require('discord.js')
const { readdir } = require('fs-nextra')
const Enmap = require('enmap')
const EnmapLevel = require('enmap-level')
const klaw = require('klaw')
const path = require('path')

class designhubBot extends Client {
  constructor(options) {
    super(options)
    this.config = require('./configs/config.json')
    this.commands = new Enmap()
    this.aliases = new Enmap()
    this.monitors = new Enmap()
    this.settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) })
    this.stats = new Enmap({ provider: new EnmapLevel({ name: 'stats' }) })
    this.cooldown = new Set()
    this.mutes = new Set()
  }

  permlevel(message) {
    // Bot Owner gets 10
    if (client.config.ownerID.includes(message.author.id)) return 10
    // DM Channels
    if (message.channel.type === 'dm') return 0
    // Guild Owner gets 10
    if (message.author.id === message.guild.ownerID) return 9
    // Loop through config
    const ranks = require('./configs/permlevel.json')
    for (let rank in ranks) {
      if (ranks.hasOwnProperty(rank)) {
        const role = message.guild.roles.find(r => r.name.toLowerCase() === rank.toLowerCase())
        if (role && message.member.roles.has(role.id)) return ranks[rank]
      }
    }
    // else
    if (!message.guild || !message.member) return 0
  }

  log(type, msg, title) {
    if (!title) title = 'Log'
    client.guilds
      .get(client.config.mainGuildID)
      .channels.get(client.config.logChannel)
      .send('**[' + type + ']** [' + title + '] `' + msg + '`')
    console.log(`[${type}] [${title}] ${msg}`)
  }

  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(client)
      props.conf.location = commandPath
      //console.log(`[log] Loading Command: ${props.help.name}. 👌`)
      if (props.init) {
        props.init(client)
      }
      client.commands.set(props.help.name, props)
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name)
      })
      return false
    } catch (e) {
      return e
    }
  }

  async unloadCommand(commandPath, commandName) {
    let command
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName)
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName))
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`

    if (command.shutdown) {
      await command.shutdown(client)
    }
    delete require.cache[require.resolve(`${commandPath}/${commandName}.js`)]
    return false
  }

  loadMonitor(monitorPath, monitorName) {
    try {
      const props = new (require(`${monitorPath}${path.sep}${monitorName}`))(client)
      props.conf.location = monitorPath
      //console.log(`[log] Loading Monitor: ${props.help.name}. 👌`)
      if (props.init) {
        props.init(client)
      }
      client.monitors.set(props.help.name, props)
      return false
    } catch (e) {
      return e
    }
  }

  async unloadMonitor(monitorPath, monitorName) {
    let monitor
    if (client.monitors.has(monitorName)) {
      monitor = client.monitors.get(monitorName)
    }
    if (!monitor) return `The monitor \`${monitorName}\` doesn"t seem to exist. Try again!`

    if (monitor.shutdown) {
      await monitor.shutdown(client)
    }
    delete require.cache[require.resolve(`${monitorPath}/${monitorName}.js`)]
    return false
  }
}

const client = new designhubBot()

require('./functions/functions.js')(client)

const init = async () => {
  // COMMANDS
  klaw('./commands').on('data', item => {
    const file = path.parse(item.path)
    if (!file.ext || file.ext !== '.js') return
    const response = client.loadCommand(file.dir, `${file.name}${file.ext}`)
    if (response) console.log(response)
  })

  // MONITORS
  klaw('./monitors').on('data', item => {
    const file = path.parse(item.path)
    if (!file.ext || file.ext !== '.js') return
    const response = client.loadMonitor(file.dir, `${file.name}${file.ext}`)
    if (response) console.log(response)
  })

  // EVENTS
  const evtFiles = await readdir('./events/')
  console.log(`[log] Loading a total of ${evtFiles.length} events.`)
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0]
    const event = new (require(`./events/${file}`))(client)
    client.on(eventName, (...args) => event.run(...args))
    //console.log(`[log] Loading Event: ${eventName}. ✔`)
    delete require.cache[require.resolve(`./events/${file}`)]
  })

  // LOGIN
  client.login(client.config.tokens.discord)
}

init()
