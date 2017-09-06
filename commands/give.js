const XPs = require("../functions/xp.js");
const Chests = require("../functions/chests.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const user = message.mentions.users.first();
    const amount = Number(args[2]);
    const method = args[0];
    if(!user || !amount || !method) return message.channel.send("Nutze `!give xp/chests <@user> <amount>` um die Stats eines Users zu manipulieren. 😉");
    if(!Number.isInteger(amount)) return message.channel.send("Is "+amount+" ne Zahl? lol");
    switch (method) {
        case "xp":
            XPs.addXP(client,user,amount)
            message.channel.send(`Es wurden ${amount} XP an ${user} vergeben!`)
            break;
        case "chests":
            Chests.addChests(client,user,amount)
            message.channel.send(`Es wurden ${amount} Chests an ${user} vergeben!`)
            break;
        default:
            break;
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 9
};

exports.help = {
    name: "give",
    category: "Levels",
    description: "Give user xp.",
    usage: "give xp/chests <@user> <amount>"
};