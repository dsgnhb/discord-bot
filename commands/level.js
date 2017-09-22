const XPs = require(__dirname + "/../functions/xp.js");
const request = require("request");
const { RichEmbed } = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
  let member = message.mentions.users.first() || message.author;
  let url = client.config.apiEndpoint+"/levels/"+member.id;
  request.get({
    url: url,
    json: true,
    headers: { 'Token': client.config.tokens.api},
  }, function(error, response, body) {
    if(!body.xp) return message.channel.send("Dich gibt's hier noch ned.");

    let totalXP = body.xp;
    let level = XPs.xpToLevel(totalXP);
    let remainingXP = 0;
    let x = 0;
    for (let i = 0; i < level; i++) {
      x += XPs.xpForLevel(i);
      remainingXP = totalXP - x;
    }
    // 85/100 (tot. 85)
    let levelXP = XPs.xpForLevel(level);
    const embed = new RichEmbed()
      .setAuthor("Levels | "+ member.username, member.avatarURL)
      .setURL("https://dsgnhb.de/levels/")
      .setColor(settings.embedColor)
      .addField("Rank","**"+body.rank+"**/"+client.users.size, true)
      .addField("Level", `**${level}** (${totalXP} XP)`, true)
      .addField("Chests",`**${body.chests}**`, true)
      .setTimestamp()
      .setFooter(settings.embedFooter, settings.embedIcon);
    message.channel.send(embed)
  });
  
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rank", "levels"],
    permLevel: 0
  };
  
  exports.help = {
    name: "level",
    category: "Levels",
    description: "Und.. Bin ich noch Erster? WAS?! APORED WIRD DEIN DORF VERBRENNEN!",
    usage: "level"
  };