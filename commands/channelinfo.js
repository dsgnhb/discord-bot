const { RichEmbed } = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
  const channel = message.channel;
  const embed = new RichEmbed()
    .setAuthor(`#${channel.name}`, message.guild.iconURL)
    .setColor(settings.embedColor)
    .addField('Topic', `${channel.topic}`, false)
    .addField('Position', `${channel.position}`, true)
    .setTimestamp()
    .setFooter(settings.embedFooter, settings.embedIcon);
  message.channel.send({embed}).catch(e => console.error(e));
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "channelinfo",
    category: "Info",
    description: "Erfahre die Channel-Beschreibung ohne hochzuschauen (is unnötig lol)",
    usage: "channelinfo"
  };