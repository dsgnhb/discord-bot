const Command = require('../../base/commands/Command.js');
const sendMemberChart = require('../../functions/memberchart');

class Messages extends Command {
  constructor(client) {
    super(client, {
      name: 'users',
      category: 'Info',
      description: 'SO VIELE MENSCHEN 😍',
      usage: 'users',
      dm: true,
      guild: true,
      permLevel: 0
    })
  }

  async run(message, args) {
    sendMemberChart(message, this.client);
  }
}

module.exports = Messages;
