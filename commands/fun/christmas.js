const Command = require('../../base/commands/Command.js')

class Advent extends Command {
  constructor(client) {
    super(client, {
      name: 'christmas',
      aliases: ['open', 'gommewin', 'advent'],
      description: 'WEIHNAHCTENENENENNEEE',
      usage: 'christmas',
      dm: true,
      guild: false,
      permLevel: 10
    })
  }

  async run(message, args) {
    // NICK USER IN MAINGUILD TO 🎄 + name
    // GET OPEN ITEM FROM ARRAY WITH CURRENT DATE (DAY)
    /*
        array[day-1]
        [
            {
                vidID : "dfsdfsdf",
                vidName: "MEGA OP VID"
            }
        ]
    */
    // SAVE CURRENT DATE (DAY) TO PERSISTENT COLLECTION, advent.get(message.author.id)
    /*
        [1,2,3,5,8]
    */
    // if(advent.get(message.author.id).lenght > 10) => GIVE COINS
    // SEND SELECTED ITEM + COINS MESSAGE
  }
}

module.exports = Advent
