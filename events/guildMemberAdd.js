// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  client.log("Log", `${member} joined the Server!`, "+")
};