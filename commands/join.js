exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const rank = args[0];
    if(!rank) {
      message.channel.send("Please provide a Group to join")
      return
    }
    role = message.guild.roles.find(r => r.name.toLowerCase() === rank.toLowerCase());
    if (role) {
      if(message.member.roles.has(role.id)) {
        message.member.removeRole(role, "Requested via !join.").then(() =>{
          message.channel.send("Succesfully removed role " + role.name)
        }).catch((error) => {
          // No Perms
        })
        
      } else {
          message.member.addRole(role, "Requested via !join.").then(() =>{
            message.channel.send("Succesfully added role " + role.name)
          }).catch((error) => {
            // No Perms
          })
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
    category: "No category",
    description: "Join/Leave Skill ranks.",
    usage: "join <Group to join>"
  };