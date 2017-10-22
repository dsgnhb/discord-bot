const Monitor = require('./Monitor.js')
const LevelsBase = require('../base/LevelsBase.js')

class LevelsMonitor extends Monitor {
  constructor(client, options) {
    super(
      client,
      Object.assign(options, {
        category: 'Levels',
        dm: false,
        guild: true,
        maxPermLevel: 10
      })
    )
    this.f = new LevelsBase(client)
  }
}

module.exports = LevelsMonitor
