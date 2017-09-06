const { RichEmbed } = require('discord.js');
exports.run = (client, message, args, level) => {
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
  if (!args[0]) {
    const myCommands = message.guild ? client.commands.filter(cmd => cmd.conf.permLevel <= level) : client.commands.filter(cmd => cmd.conf.permLevel <= level &&  cmd.conf.guildOnly !== true);
    const commandNames = myCommands.keyArray();
    let currentCategory = "";
    let msg = {embed : {
      color: 3058623,
      author: {
        name: "Commands",
        icon_url: message.guild.iconURL
      },
      description: `Mehr gibt's mit ${settings.prefix}help <command> `,
      fields : [],
      timestamp: new Date(),
      footer: {
        icon_url: client.settings.get(message.guild.id).embedIcon,
        text: client.settings.get(message.guild.id).embedFooter
      }
    }};
    let i = -1;
    const sorted = myCommands.sort((p, c) => p.help.category > c.help.category ? 1 : -1);
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        msg.embed.fields.push({ name: cat, value : ""})
        currentCategory = cat;
        i++;
      }
      msg.embed.fields[i].value += `${settings.prefix}${c.help.name} - ${c.help.description}\n`;
    });
    message.channel.send(msg);
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
    category: "System",
    description: "Den Command hast du doch gerade ausgeführt..",
    usage: "help (<command>)"
  };