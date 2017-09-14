exports.run = (client, message, level) => {
    if (message.content.startsWith("/gommemode")) {
      console.log(level);
      let role = message.guild.roles.find(r => r.name === "/gommemode");
      if(!message.member.has(role.id) || !level>=9) return;
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