const request = require("request");
const { Attachment } = require('discord.js');

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.addChests = async (client, member, number) => {
    return new Promise((resolve, reject) => {
        let avatar = member.displayAvatarURL;
        let size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);

        let url = client.config.apiEndpoint+"/levels/chests/"+member.id;
        let postData = { "chests": number, "username": member.username, "discriminator": member.discriminator, "avatar": avatar};
        request.post({
            url: url,
            body: postData,
            json: true
        }, function(error, response, body) {
            if(!body) return client.log("error", "db error while adding Chests");
            if(body.error) {
                client.log("error", body.error);
                reject(body.error);
            } else {
                client.log("log", `${member.username} (${member.id}) just earned ${number} Chests!`, "Chests")
                resolve(true);
            }
        });
    });
};
exports.removeChests = async (client, member, number) => {
    return new Promise((resolve, reject) => {
        let avatar = member.displayAvatarURL;
        let size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);
        let url = client.config.apiEndpoint+"/levels/chests/"+member.id;
        let postData = { "chests": number, "username": member.username, "discriminator": member.discriminator, "avatar": avatar};
        request.delete({
            url: url,
            body: postData,
            json: true
        }, function(error, response, body) {
            if(!body) return client.log("error", "db error while removing chests");
            if(body.error) {
                client.log("error", body.error);
                resolve(false);
            } else {
                client.log("log", `${member.username} (${member.id}) just lost ${number} Chests!`, "Chests")
                resolve(true);
            }
        });
    });
};
exports.getRandomChest = async () => {
    /*
        {
            name: "ein bisschen schöne Musik",
            freq: 2,
            run : function(client, message) {
                message.channel.send(new Attachment("./assets/vids/apored-wapbap.mp4", "musik.mp4"))
            }
        },
     */
    const items = [
        {
            name: "einen Lukas",
            freq: 1,
            run : function(client, message) { message.channel.send('*Lukas* : hey. you. wanna sub to my youtube channel? its free. 🕶 \n🔥 __***COME ON SUB MY FCKING YOUTUBE CHANNEL***__ 🔥', new Attachment("./assets/imgs/lukas.jpg", "lukas.jpg")) }
        },
        {
            name: "NICHTS",
            freq: 2,
            run : function(client, message) { message.channel.send(new Attachment("./assets/gifs/loading.gif", "loading.gif")) }
        },
        {
            name: "eine Gomme-Explosion",
            freq: 3,
            run : function (client, message) {
                message.channel.send("<:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210> \n<:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210>")
                message.channel.send(new Attachment("./assets/gifs/gommplosion.gif", "gommplosion.gif"))
            }
        },
        {
            name: "ein Einhorn",
            freq: 3,
            run : function(client, message) { message.channel.send('Meddl, ich bin ein Einhorn! 🦄') }
        }

    ];
    let sumFreq = 0;
    for(i=0; i<items.length; i++) {
        sumFreq =+ items[i].freq;
    }
    let randomFreq = randomNum(0, sumFreq);
    let freq = 0;
    for (let i = 0; i < items.length; i++) {
        freq =+ items[i].freq;
        if(randomFreq <= freq) {
            return items[i]
        }
    }
};