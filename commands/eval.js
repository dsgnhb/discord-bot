exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
  const code = message.content.replace('!eval', '').trim();
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
  }
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10 // DO NOT LOWER THIS!!!!!!!!
};
  
exports.help = {
  name: "eval",
  category: "System",
  description: "Ich bin gefährlich. hehe.",
  usage: "eval <code...>"
};