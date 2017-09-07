// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

module.exports = (client, message) => {
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;
  
    // Grab the settings for this server from the PersistentCollection
    // If there is no guild, get default conf (DMs)
    const settings = message.guild
      ? client.settings.get(message.guild.id)
      : client.config.defaultSettings;
  
    // For ease of use in commands and functions, we'll attach the settings
    // to the message object, so `message.settings` is accessible.
    message.settings = settings;

    // Get the user or member's permission level from the elevation
    const level = client.permlevel(message);
  
    // Looping trough all monitors.
    const { promisify } = require("util");
    const readdir = promisify(require("fs").readdir);
    const init = async () => {
      const monFiles = await readdir(__dirname + "/../monitors/");
      monFiles.forEach(file => {
        try {
          if (file.split(".").slice(-1)[0] !== "js") return;
          const monitorName = file.split(".")[0];
          const monitor = require(`../monitors/${file}`);
          monitor.run(client, message, level);
          delete require.cache[require.resolve(`../monitors/${file}`)];
        } catch (e) {
          console.log(`[warn] [Error] Unable to load monitor ${file}: ${e}`);
          console.log(e)
        }
      })
    }
    init();

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if (message.content.indexOf(settings.prefix) !== 0) return;
  
    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(settings.prefix.length).trim().match(/\w+|"[^"]+"/g);
    for (let i = 0; i < args.length; i++) {
      args[i] = args[i].replace(/['"]+/g, '')
    }
    const command = args.shift().toLowerCase();
  
  
    // Check whether the command, or alias, exist in the collections defined
    // in app.js.
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    // using this const letName = thing OR otherthign; is a pretty efficient
    // and clean way to grab one of 2 values!
  
    // Some commands may not be useable in DMs. This check prevents those commands from running
    // and return a friendly error message.
    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");
  
    // If the command exists, **AND** the user has permission, run it.
    if (cmd && level >= cmd.conf.permLevel) {
      client.log("log", `${message.author.username} (${message.author.id}) ran command ${cmd.help.name} - ${args.join(",")}`, "CMD");
      cmd.run(client, message, args, level);
    }
    // Best Practice: **do not** reply with a message if the command does
    // not exist, or permissions lack.
  };