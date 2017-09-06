const Chests = require("../functions/chests.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.channel.send("Mal schauen...");
  /*
  //message.channel.startTyping();
  

  const hasChests = Chests.removeChests(client, message.author, 1)
  if(!hasChests) return message.channel.send("Hm.. Hier steht keine Kiste mit deinem Namen.. 😕 \nKeine Angst, Kisten mit tollen Überraschungen erhälst du automatisch durch aktives Schreiben im Chat!");
  message.channel.send("Mh... Wo steht den deine Kiste?");

  const item = Chests.getRandomChest();
  message.channel.send("*knartz*");
  item.run(message);
  //message.channel.stopTyping(true);
  */
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