const Command = require('./Command.js')
const LevelsBase = require('../base/LevelsBase.js')

class LevelsCommand extends Command {
  constructor(client, options) {
    super(
      client,
      Object.assign(options, {
        category: 'Levels',
        dm: false
      })
    )
    this.f = new LevelsBase(client)
  }
}
module.exports = LevelsCommand
