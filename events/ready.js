module.exports = async client => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  await client.wait(1000)

  // Both `wait` and `client.log` are in `./modules/functions`.
  client.log('log', `Ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, 'Ready!')

  // We check for any guilds added while the bot was offline, if any were, they get a default configuration.
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings))
  client.user.setPresence({ game: { name: 'dsgnhb.de', type: 0 } })

  /*
    const msg = await client.guilds.get(client.config.mainGuildID).channels.get("352470165440430082").fetchMessage("358658232748867606");
    // Create a reaction collector
    const collector = msg.createReactionCollector((reaction,user) => reaction.emoji.name === '👍');
    console.log("CREATED COLLECTOR")
    collector.on('collect', r => {
      //r.count
      //console.log(r.users)

    });

    collector.on('end', collected => console.log(`Collected ${collected.size} items`));

*/
}
