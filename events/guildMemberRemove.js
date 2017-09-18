module.exports = (client, member) => {
    client.log("Log", `${member.displayName} (${member.id}) left the Server!`, "-")
};