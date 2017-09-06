const request = require("request");
const topdesign = require("../functions/topdesign.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    let postid =  Number(args[0])
    if (!postid) return message.channel.send("**TopDesign** | Nutze `!vote #[Nr des Posts]` um für einen Post zu voten.");
    if (!Number.isInteger(postid)) return message.channel.send("**TopDesign** | Is "+postid+" ne Zahl? lol");
    var url = client.config.apiEndpoint+"/topdesign/vote/"+postid;
    let body = {
        "userid" : message.author.id
    }
    request.post({
       url: url,
       json: true,
       body, body
    }, function(error, response, body) {
        if(!body) return message.channel.send("**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕");
        if(body == "Not found") return message.channel.send("**TopDesign** | Das Design mit der Nummer **#"+postid +"** konnte nicht gefunden werden.");
        if(body.action == "remove") return message.channel.send("**TopDesign** | Dein Like wurde entfernt! Der Post von **" + body.posted_by + "** hat jetzt **"+body.likes+" "+topdesign.voteOrVotes(body.likes)+"**.");
        if(body.action == "add") return message.channel.send("**TopDesign** | Dein Like wurde hinzugefügt! Der Post von **" + body.posted_by + "** hat jetzt **"+body.likes+" "+topdesign.voteOrVotes(body.likes)+"**.");
    });
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["like"],
    permLevel: 0
  };
  
  exports.help = {
    name: "vote",
    category: "Top Design",
    description: "Vote for Post.",
    usage: "vote #<postid>"
  };