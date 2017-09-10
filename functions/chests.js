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
            run : function(client, message) { message.channel.send('*Lukas* : hey. you. wanna sub to my youtube channel? its free. 🕶 \n🔥 __***COME ON SUB MY FCKING YOUTUBE CHANNEL***__ 🔥 \nhttp://lukaas.de/youtube', new Attachment("./assets/imgs/lukas.jpg", "lukas.jpg")) }
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
        },
        {
            name: "den Gommemode",
            freq: 10,
            run : function(client, message) {
                const role = message.guild.roles.find(r => r.name.toLowerCase() === "/gommemode");
                message.member.addRole(role, "Aus Kiste.")
                message.channel.send('<:gomme:313418733861470210>')
            }
        },
        {
            name: "ein cooles Ding",
            freq: 4,
            run: function(client, message) {
                message.channel.send({ embed: {
                    color: 3447003,
                    author: {
                        name: "SGD3D",
                        icon_url: "https://puu.sh/xvAug/ca9e572b18.png"
                    },
                    title: "Einen 3D-gedruckten dsgnhb-Schlusselanhänger!",
                    url: "https://sgd3d.de/product/designhub%20-%20Schl%C3%BCsselanh%C3%A4nger",
                    description: "Für nur 1€ pro Stück. So kannst du zeigen, dass du zur designhub-Community gehörst!",
                    timestamp: new Date(),
                    footer: {
                        icon_url: "https://puu.sh/xvAug/ca9e572b18.png",
                        text: "Ein cooler 3D-Druck-Onlineshop"
                    }
                }});
                message.channel.send("Wie du noch zusätzlich einen 5%-Rabattcode erhälst, bekommst du per PN ;)");
                message.channel.send(new Attachment("./assets/gifs/noice.gif", "noice.gif"));

                message.member.send("Du musst dich nur bei https://sgd3d.de registrieren und dann diese Umfrage ausfüllen:");
                message.member.send("https://goo.gl/BjSUKd");
                message.member.send("Diese dauert nur ein paar Minuten und wenn du zum Schluss deine Email-Adresse angibst, erhälst du den 5%-Rabattcode :D");
                message.member.send("Damit hilfst du, dass SGD3D sich weiterentwickeln und auf deine Wünsche eingehen kann :P");
                message.member.send("~ CreepPlays (SGD3D Entwickler)");
            }
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