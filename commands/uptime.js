exports.run = async (client, message, args, level) => {
    let uptime = client.MStoTime(client.uptime)
    uptime = uptime.d + "d:" + uptime.h + "h:" + uptime.m + "min:" + uptime.s + "s"
    message.channel.send("Uptime: " +uptime)
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["stats"],
    permLevel: 0
  };
  
  exports.help = {
    name: "uptime",
    category: "System",
    description: "Uptime.",
    usage: "uptime"
  };