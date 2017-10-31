const Command = require('../../base/commands/Command.js')

class Chart extends Command {
  constructor(client) {
    super(client, {
      name: 'chart',
      category: 'Info',
      description: 'So Chart tests',
      usage: 'chart',
      dm: false
    })
  }

  async run(message, args) {
    /*const stats = this.client.stats
    const keys = stats.keyArray()
    const users = stats.map(a => a.member)

    const co = require('co')
    const generate = require('node-chartist')

    co(function*() {
      const options = {
        width: 400,
        height: 200,
        axisX: { title: 'Zeit' },
        axisY: { title: 'Member' }
      }

      const line = yield generate('line', options, {
        labels: keys,
        series: [users]
      })
      const content = `<html><head><link src="assets/css/chart.css"></head><body>${line}</body></html>`
      console.log(content)
      let phantom = require('phantom')
      async function init() {
        let instance = await phantom.create()
        const page = await instance.createPage()
        page.property('viewportSize', { width: 400, height: 200 })
        page.property('content', line)
        console.log(page)
        console.log(await page.render('chart.jpeg', { format: 'jpeg', quality: '100' }))
        await instance.exit()
      }
      init()
    })*/
  }
}

module.exports = Chart
