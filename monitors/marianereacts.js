exports.run = (client, message, level) => {
     // Forbidden Words
     const reactOn = ["sahnekönigin", "halt stop", "jetzt hälst du die schnauze", "sonst gibt krieg", "käsefreund", "sag ich dir gleich", "es ist obst im haus", "das bleibt alles so", "ob du hier bist", "beschweren kann man sich da eher weniger"];
     const answers = ["was den hier los?!!", "was das den hier??!", "halt stop!", "was machst du denn??!"];
     if(reactOn.some(word => message.content.toLowerCase().includes(word))) {
         const random = answers[Math.floor(Math.random()*answers.length)].toUpperCase()
         message.channel.send("Marianne: "+ random).then(() => client.log("log", `Mariane reacted on ${message.author.username}'s (${message.author.id}) message with answer "${random}"`,"MarianeReacts"))
     }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
  };
  
  exports.help = {
    name: "MarianeReacts",
    description: "Reacts on RTL-Memes.",
  };