const Command = require('./Command.js')
const TopDesignBase = require('../base/TopDesignBase.js')

const request = require('request')

class TopDesignCommand extends Command {
  constructor(client, options) {
    super(
      client,
      Object.assign(options, {
        category: 'Top Design',
        dm: false
      })
    )
    this.f = new TopDesignBase(client)
  }
}

module.exports = TopDesignCommand
