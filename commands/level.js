const XPs = require(__dirname + "/../functions/xp.js");
const request = require("request");
const { RichEmbed } = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
  var url = client.config.apiEndpoint+"/levels/";
  request.get({
    url: url,
    json: true
  }, function(error, response, body) {
    var result = body.filter(function( obj ) {
      return obj.userid == message.author.id;
    })[0];
    if(!result) return message.channel.send("Dich gibt's hier noch ned.")
    const embed = new RichEmbed()
      .setAuthor("Command List", message.guild.iconURL)
      .setColor(settings.embedColor)
      .addField("Rank",result.rank+"/"+client.users.size, true)
      .addField("Level", XPs.xpToLevel(result.xp)+" ("+result.xp+" XP)", true)
      .addField("Chests",result.chests, true)
      
      .setTimestamp()
      .setFooter(settings.embedFooter, settings.embedIcon);
    message.channel.send(embed)
  });
  
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "level",
    category: "Level",
    description: "Get your Level.",
    usage: "level"
  };