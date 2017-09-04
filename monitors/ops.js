exports.run = (client, message, level) => {
    if(!message.channel.id === "308681144914673675") return; 
    const opsMessages = ["ops", "opinions", "meinungen", "meinung", "wip", "work in progress"];
    if (!new RegExp(opsMessages.join("|")).test(message.content.toLowerCase())) return;
    message.react("👍");
    client.log("log", `Added Reaction an Message from ${message.author.username} (${message.author.id})`, "OPS");
}
exports.conf = {
    enabled: true,
    guildOnly: true,
  };
  
  exports.help = {
    name: "Opinions",
    description: "Adds like-reaction to every message asking for ops.",
  };