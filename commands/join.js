exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const rank = args[0];
    role = message.guild.roles.find(r => r.name.toLowerCase() === rank.toLowerCase());
    if (role) {
      if(message.member.roles.has(role.id)) {
        message.member.removeRole(role, "Requested via !join.")
        message.channel.send("Succesfully removed role " + role.name)
      } else {
        message.member.addRole(role, "Requested via !join.")
        message.channel.send("Succesfully added role " + role.name)
      }
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "join",
    category: "Miscelaneous",
    description: "Join/Leave Skill ranks.",
    usage: "join PHP"
  };