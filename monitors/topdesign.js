exports.run = (client, message, level) => {
    if(!message.attachments.first()) return;
    if(message.isMentioned(message.guild.channels.find("name", "topdesign")) || message.content.includes("#topdesign")) {
        client.log("log", `${message.author.username} (${message.author.id}) ran #topdesign`, "MONITOR");
        const request = require("request");
        var image = message.attachments.first().proxyURL
        var content = message.content
        var username = message.author.username
        var userid = message.author.id
        var avatar = message.author.displayAvatarURL
        var size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);
        var url = client.config.apiEndpoint+"/add";
        var postData = { "image": image, "content": content, "username": username, "userid": userid, "key": client.config.tokens.api, "avatar": avatar};
        postData = JSON.stringify(postData);
        request.post({
           url: url,
           body: postData,
        }, function(error, response, body) {
           var json = JSON.parse(body);
           if(json == "DB Error") { message.channel.send("**TopDesign** | Datenbank Fehler"); return}
           if(json.action == "add") { message.channel.send("**TopDesign** | Dein Post wurde erfolgreich bei Top Design eingereicht. Er kann mit `!vote #" + json.postid +"` bewertet werden."); return}
        });
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
  };
  
  exports.help = {
    name: "#topdesign",
    description: "Submit posts to TopDesign.",
  };