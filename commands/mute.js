exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-lets
    message.channel.send(`!mute`);
    const user = message.mentions.users.first();

    if(client.mutes.has(user.id)) {
        client.mutes.delete(user.id);
        message.channel.send(`${user} wurde entmuted.`);
    } else {
        client.mutes.add(user.id);
        message.channel.send(`${user} wurde gemuted.`);
        setTimeout(() => {
            client.mutes.delete(user.id);
            message.channel.send(`${user} wurde entmuted.`);
        }, 10*1000);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 9
};

exports.help = {
    name: "mute",
    category: "Utility",
    description: "Ätsch! Da kannst du nichtmehr schreiben.",
    usage: "mute (<@user>)"
};