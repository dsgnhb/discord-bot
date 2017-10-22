const Command = require('../../base/commands/Command.js')

const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const path = require('path')

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
    const { stdout, stderr, err } = await exec(`git pull ${require('../../package.json').repository.url.split('+')[1]}`, { cwd: path.join(__dirname, '../../') }).catch(err => ({ err }))
    if (err) return console.error(err)
    const out = []
    if (stdout) out.push(stdout)
    if (stderr) out.push(stderr)
    await message.channel.send(out.join('---\n'), { code: true })
    if (!stdout.toString().includes('Already up-to-date.')) {
      this.client.commands.get('reboot').run(message, args)
    }
  }
}

module.exports = Update
