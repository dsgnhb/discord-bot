exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const Levels = require(__dirname + "/../functions/levels.js");
    const data = Levels.getData(client, message.author.id);
    message.channel.send("xp:" + data.xp+ " \nlevel:" + Levels.xpToLevel(data.xp) + " \nchests:" + data.chests)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "level",
    category: "No category",
    description: "get data from levels",
    usage: "level"
  };