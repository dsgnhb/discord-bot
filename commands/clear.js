exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const user = message.mentions.users.first();
    let amount =  Number(args[0])
    if (!amount) return message.reply('Must specify an amount to delete!');
    if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
    if(amount > 50) amount = 50;
    amount++;
    message.channel.fetchMessages({
      limit: amount,
    }).then((messages) => {
      if (user) {
        const filterBy = user ? user.id : client.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      }
      message.channel.bulkDelete(messages).catch(error => console.log(error.stack)).then((messages) => {
        amount--;
        message.channel.send("`Deleted "+ amount +" messages.`").then((message) => {
            client.wait(2000)
            message.delete();
        })
      })
    });
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 9
  };
  
  exports.help = {
    name: "clear",
    category: "Utility",
    description: "Clear messages.",
    usage: "clear 10 (@user)"
  };