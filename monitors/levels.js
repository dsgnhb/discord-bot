const XPs = require(__dirname + "/../functions/xp.js");
exports.run = (client, message, level) => {
    
    if (!client.cooldown.has(message.author.id)) {
        const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
        if (message.content.startsWith(settings.prefix)) return;
        if(client.config.levelSystem === false) {
            client.log("log", `Levels System disabled! Could not give XP to ${message.author.username} (${message.author.id})!`, "Levels")
        } else {
             XPs.addXP(client, message.author);
        }
    } else {
        return;
    }
    client.cooldown.add(message.author.id);
    setTimeout(() => {
      client.cooldown.delete(message.author.id);
    }, 60*1000);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
  };
  
  exports.help = {
    name: "Levels",
    description: "Monitor for adding xp.",
  };