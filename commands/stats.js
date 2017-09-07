const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const { RichEmbed } = require('discord.js');
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
  const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings;
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embed = new RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor(settings.embedColor)
      .addField('Mem Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
      .addField('Uptime', duration, true)
      .addField('Users', client.users.size.toLocaleString(), true)
      .addField('Servers', client.guilds.size.toLocaleString(), true)
      .addField('Channels', client.channels.size.toLocaleString(), true)
      .addField('Discord.js', version, true)
      .addField('Node.js', process.version, true)
      .setTimestamp()
      .setFooter(settings.embedFooter, settings.embedIcon);
    message.channel.send({embed}).catch(e => console.error(e));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "stats",
  category: "Info",
  description: "Nerd Stuff.",
  usage: "stats"
};