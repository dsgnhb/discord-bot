const XPs = require(__dirname + "/../functions/xp.js");
const request = require("request");
const { RichEmbed } = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
  let url = client.config.apiEndpoint+"/levels/";
  request.get({
    url: url,
    json: true
  }, function(error, response, body) {
    let result = body.filter(function( obj ) {
      return obj.userid == message.author.id;
    })[0];
    if(!result) return message.channel.send("Dich gibt's hier noch ned.")
    const embed = new RichEmbed()
      .setAuthor("Levels | "+message.author.username, message.guild.iconURL)
      .setURL("https://dsgnhb.de/levels/")
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
    aliases: ["rank"],
    permLevel: 0
  };
  
  exports.help = {
    name: "level",
    category: "Levels",
    description: "Und.. Bin ich noch Erster? WAS?! APORED WIRD DEIN DORF VERBRENNEN!",
    usage: "level"
  };