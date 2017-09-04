exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const errorcode = Math.floor((Math.random() * 100000) + 1);
    await message.channel.send("Vielen Dank! Dein Report wurde entgegengenommen. \nDie Gomme-Mods werden den Vorfall überprüfen! <:gomme:313418733861470210>")
    client.wait(10000)
    message.channel.send("Puuh! Die Gomme-Mods sind am schwitzen und scheinen hier etwas überfordert. \nUnbekannter Error: x" +  + errorcode)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: "report",
    category: "Fun",
    description: "Die Gomme-Mods sind immer für dich da",
    usage: "report <@user> (<Grund>)"
  };