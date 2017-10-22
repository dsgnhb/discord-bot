class Classlol {
  constructor(client, settings) {
    this.client = client

    this.run = client => settings['run'](client) || function() {}
  }
}
module.exports = Classlol
