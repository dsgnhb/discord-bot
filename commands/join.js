exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
    const skillGroups = ["css", "html", "affinityphoto", "ruby", "sql", "c++", "c#", "swift", "phyton", "java", "php", "javascript", "blender", "cinema4d", "gimp", "photoshop"];
    if(args.length === 0) return message.channel.send(`Nutze \`!join <role>\` um einer der folgenden Skill-Gruppe beizutreten: \`${skillGroups.join("`, `")}\`.`);
    let addedRanks = [], removedRanks = [];
    for(let rank of args) {
        if (skillGroups.indexOf(rank.toLowerCase()) === -1) continue;
        role = message.guild.roles.find(r => r.name.toLowerCase() === rank.toLowerCase());
        if (!role) return;
        if(message.member.roles.has(role.id)) {
            try {
                await message.member.removeRole(role, "Requested via !join.");
                removedRanks.push(role.name);
            } catch(ex) {
                // No perms
            }
        } else {
            try {
                await message.member.addRole(role, "Requested via !join.");

                addedRanks.push(role.name);
            } catch(ex) {
                // No perms
            }
        }
    }

    if(addedRanks.length > 0) {
        message.channel.send("Du wurdest zu den Gruppe(n) **" + addedRanks.join(", ") + "** hinzugefügt.");
        client.log(`Log`,`Added ${message.author.username} (${message.author.id}) to ${addedRanks.join(", ")}`);
    }
    if(removedRanks.length > 0) {
        message.channel.send("Du wurdest aus den Gruppe(n) **" + removedRanks.join(", ") + "** entfernt.");
        client.log(`Log`,`Removed ${message.author.username} (${message.author.id}) from ${removedRanks.join(", ")}`);

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
    category: "Utility",
    description: "Bekomme nen Rang ohne nen Admin vollzuspamen. - voll schlau von mir",
    usage: "join <role>"
  };