const request = require("request");
exports.run = (client, message, level) => {
    if(!message.attachments.first()) return;
    if(message.isMentioned(message.guild.channels.find("name", "topdesign")) || message.content.includes("#topdesign")) {
        client.log("log", `${message.author.username} (${message.author.id}) ran #topdesign`, "MONITOR");
        let image = message.attachments.first().proxyURL
        let content = message.content
        let username = message.author.username
        let userid = message.author.id
        let avatar = message.author.displayAvatarURL
        let size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);
        let url = client.config.apiEndpoint+"/posts";
        let postData = { "image": image, "content": content, "username": username, "userid": userid, "avatar": avatar};
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