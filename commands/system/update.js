const Command = require('../../base/commands/Command.js')

const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const path = require('path')
const { RichEmbed } = require('discord.js')

class Update extends Command {
  constructor(client) {
    super(client, {
      name: 'update',
      aliases: ['git', 'pull'],
      category: 'System',
      description: 'Neue Features ;)',
      usage: 'update',
      dm: true,
      guild: true,
      permLevel: 9
    })
  }

  async run(message, args) {
    const settings = message.settings

    message.channel.send('Suche nach neuem Update...')

    let repository = await require('../../package.json').repository.url.split('+')[1]
    delete require.cache[require.resolve('../../package.json')]

    const { stdout, stderr, err } = await exec(`git pull ${repository}`, { cwd: path.join(__dirname, '../../') }).catch(err => ({ err }))
    if (err) return console.error(err)

    if (stdout.toString().includes('Already up-to-date.')) return message.channel.send('Already up-to-date.')

    let changelog = await require('../../changelog.json')
    let packageJSON = await require('../../package.json')

    console.log(changelog)
    console.log(packageJSON)

    let changelogVersion = changelog[packageJSON.version]

    while (!changelogVersion) {
      delete require.cache[require.resolve('../../changelog.json')]
      changelog = await require('../../changelog.json')
      changelogVersion = changelog[packageJSON.version]
      console.log(changelog)

      //change
    }

    await message.channel.send(
      new RichEmbed()
        .setAuthor(`Neue Version: Changelog v${packageJSON.version}`)
        .setDescription(changelogVersion.join('\n'))
        .setURL(packageJSON.repository.url.split('+')[1].slice(0, -4))
        .setColor(settings.embedColor)
        .setTimestamp()
        .setFooter(settings.embedFooter, settings.embedIcon)
    )

    message.channel.send('Update wird heruntergeladen...')
    this.client.wait(2000)
    /*
    const out = []
    if (stdout) out.push(stdout)
    if (stderr) out.push(stderr)
    await message.channel.send(out.join('---\n'), { code: true })
    */

    this.client.commands.get('reboot').run(message, args)
  }
}

module.exports = Update
