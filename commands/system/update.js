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

    const repository = require('../../package.json').repository.url.split('+')[1]
    delete require.cache[require.resolve('../../package.json')]

    const { stdout, stderr, err } = await exec(`git pull ${repository}`, { cwd: path.join(__dirname, '../../') }).catch(err => ({ err }))
    if (err) return console.error(err)

    if (stdout.toString().includes('Already up-to-date.')) return message.channnel.send('Already up-to-date.')

    const changelog = require('../../changelog.json')
    const newVersion = require('../../package.json').version
    await message.channel.send(
      new RichEmbed()
        .setAuthor('Changelog')
        .setURL(repository.slice(0, -4))
        .setColor(settings.embedColor)
        .addField(`v${NewVersion}`, chnagelog[newVersion].join('\n'), false)
        .setTimestamp()
        .setFooter(settings.embedFooter, settings.embedIcon)
    )

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
