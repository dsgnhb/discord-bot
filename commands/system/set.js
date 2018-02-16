const Command = require('../../base/commands/Command.js')

const { inspect } = require('util')

class Set extends Command {
  constructor(client) {
    super(client, {
      name: 'set',
      aliases: ['setting', 'settings', 'conf'],
      category: 'System',
      description: 'Hier kann man den Prefix ändern und so.',
      usage: 'set <view/get/edit> <key> <value>',
      permLevel: 10
    })
  }

  async run(message, [action, key, ...value]) {
    // eslint-disable-line no-unused-vars

    // Retrieve current guild settings
    const settings = this.client.settings.get(message.guild.id)

    // First, if a user does `-set add <key> <new value>`, let's add it
    if (action === 'add') {
      if (!key) return message.reply('Please specify a key to add')
      if (settings[key]) return message.reply('This key already exists in the settings')
      if (value.length < 1) return message.reply('Please specify a value')

      // `value` being an array, we need to join it first.
      settings[key] = value.join(' ')

      // One the settings is modified, we write it back to the collection
      this.client.settings.set(message.guild.id, settings)
      message.reply(`${key} successfully added with the value of ${value.join(' ')}`)
    } else if (action === 'edit') {
      // Secondly, if a user does `-set edit <key> <new value>`, let's change it
      if (!key) return message.reply('Please specify a key to edit')
      if (!settings[key]) return message.reply('This key does not exist in the settings')
      if (value.length < 1) return message.reply('Please specify a new value')

      settings[key] = value.join(' ')

      this.client.settings.set(message.guild.id, settings)
      message.reply(`${key} successfully edited to ${value.join(' ')}`)
    } else if (action === 'del') {
      // Thirdly, if a user does `-set del <key>`, let's ask the user if they're sure...
      if (!key) return message.reply('Please specify a key to delete.')
      if (!settings[key]) return message.reply('This key does not exist in the settings')

      // Throw the 'are you sure?' text at them.
      const response = await this.client.awaitReply(message, `Are you sure you want to permanently delete ${key}? This **CANNOT** be undone.`)

      // If they respond with y or yes, continue.
      if (['y', 'yes'].includes(response)) {
        // We delete the `key` here.
        delete settings[key]
        this.client.settings.set(message.guild.id, settings)
        message.reply(`${key} was successfully deleted.`)
      } else if (['n', 'no', 'cancel'].includes(response)) {
        // If they respond with n or no, we inform them that the action has been cancelled.
        message.reply('Action cancelled.')
      }
    } else if (action === 'get') {
      if (!key) return message.reply('Please specify a key to view')
      if (!settings[key]) return message.reply('This key does not exist in the settings')
      message.reply(`The value of ${key} is currently ${settings[key]}`)
    } else {
      return (inspect(settings), { code: 'json' })
    }
  }
}

module.exports = Set
