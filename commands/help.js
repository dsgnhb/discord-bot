const { RichEmbed } = require('discord.js');
exports.run = (client, message, args, level) => {
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
  if (!args[0]) {
      const myCommands = message.guild ? client.commands.filter(cmd => cmd.conf.permLevel <= level) : client.commands.filter(cmd => cmd.conf.permLevel <= level &&  cmd.conf.guildOnly !== true);
      const commandNames = myCommands.keyArray();
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      let currentCategory = "";
      let output = `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n`;
      const embed = new RichEmbed()
        .setAuthor("Command List", message.guild.iconURL)
        .setColor(settings.embedColor)
        .setTimestamp()
        .setFooter(settings.embedFooter, settings.embedIcon);
      const sorted = myCommands.sort((p, c) => p.help.category > c.help.category ? 1 : -1);
      sorted.forEach( c => {
        const cat = c.help.category.toProperCase();
        if (currentCategory !== cat) {
          embed.addField(cat, "-", false)
          currentCategory = cat;
        }
        embed.addField(`${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)}`, c.help.description, true)
      });
      message.channel.send({embed}).catch(e => console.error(e));
    } else {
      let command = args[0];
      if (client.commands.has(command)) {
        command = client.commands.get(command);
        if (level < command.conf.permLevel) return;
        const embed = new RichEmbed()
        .setAuthor(`${settings.prefix}${command.help.name}`, message.guild.iconURL)
        .setColor(client.settings.get(message.guild.id).embedColor)
        .setDescription(command.help.description)
        .addField("Usage", `${settings.prefix}${command.help.usage}`, false)
        .setTimestamp()
        .setFooter(client.settings.get(message.guild.id).embedFooter, client.settings.get(message.guild.id).embedIcon);
        message.channel.send(embed)
      }
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "halp"],
    permLevel: 0
  };
  
  exports.help = {
    name: "help",
    category: "Generql",
    description: "Displays all the available commands for your permission level.",
    usage: "help (<command>)"
  };