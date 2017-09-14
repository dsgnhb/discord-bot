exports.run = (client, message, level) => {
    if (message.content.startsWith("/gommemode")) {
      let role = message.guild.roles.find(r => r.name === "/gommemode");
      if(!message.member.roles.has(role.id)) return;
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