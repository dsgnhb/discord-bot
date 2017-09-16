module.exports = (client, member) => {
  client.log("Log", `${member.username} (${member.id}) joined the Server!`, "+")
};