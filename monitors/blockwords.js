exports.run = (client, message, level) => {
    if(level >= 8) return;

    // Fordbidden Words
    const swearWords = ["darn", "shucks", "frak", "shite"];
    if(swearWords.some(word => message.content.includes(word))) {
        message.delete().then(() => client.log("log", `${message.author.username} (${message.author.id}) said a blocked word!`,"Bad Words"))
    }

    // Allowed Invites
    const allowedLinks = ["https://discordapp.com/invite/PGv5TR3", "https://discord.gg/PGv5TR3"];
    if(allowedLinks.some(word => message.content.includes(word))) return;
    
    // Forbidden Invites
    const forbiddenLinks = ["discord.gg", "discord.io", "discord.me", "discord.li", "discordapp.com/invite/"];
    if(forbiddenLinks.some(word => message.content.includes(word))) {
        message.delete().then(() => client.log("log", `${message.author.username} (${message.author.id}) sent an invite!`, "AD"))
    }
        
}
exports.conf = {
    enabled: true,
    guildOnly: true,
  };
  
  exports.help = {
    name: "Block Words",
    description: "Blocks Words and Discord invite links.",
  };