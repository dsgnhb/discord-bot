const request = require("request");
const Chests = require("./chests.js");

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const xpForLevel = (n) =>{
    return 5*(n^2)+50*n+100
};
const xpToLevel = (xp) =>{
    let remaining_xp = xp
    let level = 0;
    while(remaining_xp >= xpForLevel(level)) {
        remaining_xp -= xpForLevel(level)
        level += 1
    }
    return level;
};
exports.xpForLevel = (n) =>{
    return 5*(n^2)+50*n+100
};
exports.xpToLevel = (xp) =>{
    let remaining_xp = xp
    let level = 0;
    while(remaining_xp >= xpForLevel(level)) {
        remaining_xp -= xpForLevel(level)
        level += 1
    }
    return level;
};
exports.addXP = async (client, member, number) => {
    return new Promise((resolve, reject) => {
        if(!number) number = randomNum(15, 20)

        let avatar = member.displayAvatarURL
        let size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);

        let url = client.config.apiEndpoint + "/levels/xp/" + member.id;
        let postData = {"xp": number, "username": member.username, "discriminator": member.discriminator, "avatar": avatar};
        request.post({
            url: url,
            body: postData,
            json: true
        }, function (error, response, body) {
            if (!body) return client.log("error", "db error while adding xp")
            if (body.error) {
                client.log("error", body.error);
                reject(body.error)
                return;
            }
            client.log("log", `${member.username} (${member.id}) just earned ${number} XP!`, "XP")
            let oldLevel = xpToLevel(body.oldXP);
            let newLevel = xpToLevel(body.newXP);

            if (newLevel > oldLevel) {
                if ((newLevel % 2) === 0) {
                    const success = Chests.addChests(client, member, 1);
                    client.users.get(member.id).send(`Hey! Du bist jetzt **Level ${newLevel}** ! Du hast eine neue Kiste.`)

                } else {
                    client.users.get(member.id).send(`Hey! Du bist jetzt **Level ${newLevel}** !`)
                }
            }
            resolve(true);
        });
    });
};
exports.removeXP = async (client, member, number) => {
    return new Promise((resolve, reject) => {
        let avatar = member.displayAvatarURL;
        let size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);

        let url = client.config.apiEndpoint+"/levels/xp/"+member.id;
        let postData = { "xp": number, "username": member.username, "discriminator": member.discriminator, "avatar": avatar};
        request.delete({
            url: url,
            body: postData,
            json: true
        }, function(error, response, body) {
            if(!body) return client.log("error", "db error while removing xp");
            if(body.error) {
                client.log("error", body.error);
                resolve(false);
            } else {
                client.log("log", `${member.username} (${member.id}) just lost ${number} XP!`, "XP")
                resolve(true);
            }
        });
    });
};