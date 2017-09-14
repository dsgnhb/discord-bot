exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
    if(!args[0]) return;
    const errorcode = Math.floor((Math.random() * 100000) + 1);
    message.channel.send("Vielen Dank! Dein Report wurde entgegengenommen. \nDie Gomme-Mods werden den Vorfall überprüfen! <:gomme:313418733861470210>")
    await client.wait(10000)
    let messages = ["Puuh! Die Gomme-Mods sind am schwitzen und scheinen hier etwas überfordert.", "Leider mussten alle Gomme-Mods schon ins Bett.", "Alle Gomme-Mods sind gerade am kacken. Versuchs in "+errorcode + " Stunden nochmal. loool"]
    var msg = messages[Math.floor(Math.random()*messages.length)];
    message.channel.send(msg+" \nUnbekannter Error: x" +  + errorcode)
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
    description: "Die Gomme-Mods sind immer für dich da.",
    usage: "report <@user> (<Grund>)"
  };