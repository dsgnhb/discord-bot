const request = require("request");
const topdesign = require("../functions/topdesign.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var url = client.config.apiEndpoint+"/topdesign/posts/currentmonth";
    request.get({
       url: url,
       json: true
    }, function(error, response, body) {
        if(!body) return message.channel.send("**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕");
        let posts = "";
        for (var i = 0; i < body.length; i++) {
            let entry = body[i];
            posts += "**#"+ entry.id +"** | "+ entry.username +"  -  **"+ entry.likes +"** "+ topdesign.voteOrVotes(entry.likes) + "\n"
        }
        message.channel.send("**TopDesign** | Alle aktiven Posts findest du hier: https://dsgnhb.de/topdesign \n\n" + posts + "\nNutze `!vote #id` um für einen Post zu voten.")
    });
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "posts",
    category: "Top Design",
    description: "List all Post of current month.",
    usage: "posts"
  };