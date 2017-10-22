const Monitor = require('./Monitor.js')
const TopDesignBase = require('../base/TopDesignBase.js')

class TopDesignMonitor extends Monitor {
  constructor(client, options) {
    super(
      client,
      Object.assign(options, {
        category: 'Design',
        dm: false,
        guild: true,
        maxPermLevel: 10
      })
    )
    this.f = new TopDesignBase(client)
  }
}

module.exports = TopDesignMonitor
