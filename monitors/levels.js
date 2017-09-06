const Levels = require(__dirname + "/../functions/levels.js");
let talkedRecently = new Set();
exports.run = (client, message, level) => {
    // Checks if they have talked recently
    //console.log("New Message")
    if (talkedRecently.has(message.author.id)) {
        /* 
         You can change the nature of the cool down by changing the return to something else. 
         REMINDER: You may need to add an else statement if you do not have any returns in this scope.
        */
        //console.log(talkedRecently)
        //console.log("wait 5 secs")
        return;
    } else {
        //console.log(talkedRecently)
        //console.log("accept")
    }
    // Adds the user to the set so that they can't talk for 2.5 seconds
    talkedRecently.add(message.author.id);
    setTimeout(() => {
        // Removes the user from the set after 2.5 seconds
        talkedRecently.delete(message.author.id);
    }, 5000);
}
    /*const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
    if (message.content.startsWith(settings.prefix)) return;
    //Levels.addXP(client, message.author.id);
*/
exports.conf = {
    enabled: true,
    guildOnly: false,
  };
  
  exports.help = {
    name: "Levels",
    description: "Monitor for adding xp.",
  };