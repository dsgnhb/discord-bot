exports.run = async (client, message, args, level) => {
    message.reply(`Your permission level is: ${level}`);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "mypermlevel",
    category: "Miscelaneous",
    description: "Tells you your permission level for the current message location.",
    usage: "mypermlevel"
  };