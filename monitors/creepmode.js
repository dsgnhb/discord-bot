exports.run = (client, message, level) => {
    if (message.content.startsWith("/creepmode")) {
      message.channel.send("**Zzzzzzzzzzz!**");
      client.log("log", `${message.author.username} (${message.author.id}) ran command /creepmode`, "CMD")
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
  };
  
  exports.help = {
    name: "/creepmode",
    description: "Zzzzzz.",
  };