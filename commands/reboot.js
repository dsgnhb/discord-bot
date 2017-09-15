let hasPM2;

try {
    require.resolve("pm2");
    hasPM2 = "PM2 is installed, hopefully that means this bot will reboot in a moment!";
} catch (e) {
    hasPM2 = "Cannot find PM2. You must restart this bot manually from the command prompt.";
}

exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
    await message.reply(`Bot is shutting down. ${hasPM2}`);
    process.exit(1);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 10
};

exports.help = {
    name: "reboot",
    category: "System",
    description: "Wenn alles nicht mehr klappt.. einfach neustart",
    usage: "reboot"
};