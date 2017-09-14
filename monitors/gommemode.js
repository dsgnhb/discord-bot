exports.run = (client, message, level) => {
    if (message.content.startsWith("/gommemode")) {
      const functions = require("../functions/functions.js");
      let role = message.guild.roles.find(r => r.name === "/gommemode");
      if(!message.member.roles.has(role.id)||functions.permlevel(message)<9) return;
      message.channel.send("**trololol!**");
      client.log("log", `${message.author.username} (${message.author.id}) ran command /gommemode`, "CMD")
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
  };
  
  exports.help = {
    name: "/gommemode",
    description: "trololol.",
  };