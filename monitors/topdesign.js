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
        var url = client.config.apiEndpoint+"/posts";
        var postData = { "image": image, "content": content, "username": username, "userid": userid, "avatar": avatar};
        message.channel.startTyping()
        request.post({
           url: url,
           body: postData,
           json: true
        }, function(error, response, body) {
            message.channel.stopTyping(true)
            if(!body) return message.channel.send("**TopDesign** | Uiih. hier scheint etwas nicht zu funktionieren, wie es sollte.. 😕");
            if(body.action == "add") return message.channel.send("**TopDesign** | Dein Post wurde erfolgreich bei Top Design eingereicht. Er kann mit `!vote #" + body.postid +"` bewertet werden.");
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