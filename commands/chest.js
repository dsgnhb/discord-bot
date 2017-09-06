exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send("soon")
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "chest",
    category: "Levels",
    description: "Oaah. Magie.",
    usage: "chest"
  };