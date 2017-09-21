const request = require("request");
const {
    Attachment
} = require('discord.js');
const XPs = require(__dirname + "/../functions/xp.js");

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.addChests = async(client, member, number) => {
    return new Promise((resolve, reject) => {
        let avatar = member.displayAvatarURL;
        let size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);

        let url = client.config.apiEndpoint + "/levels/chests/" + member.id;
        let postData = {
            "chests": number,
            "username": member.username,
            "discriminator": member.discriminator,
            "avatar": avatar
        };
        request.post({
            url: url,
            body: postData,
            json: true
        }, function (error, response, body) {
            if (!body) return client.log("error", "db error while adding Chests");
            if (body.error) {
                client.log("error", body.error);
                reject(body.error);
            } else {
                client.log("log", `${member.username} (${member.id}) just earned ${number} Chests!`, "Chests")
                resolve(true);
            }
        });
    });
};
exports.removeChests = async(client, member, number) => {
    return new Promise((resolve, reject) => {
        let avatar = member.displayAvatarURL;
        let size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);
        let url = client.config.apiEndpoint + "/levels/chests/" + member.id;
        let postData = {
            "chests": number,
            "username": member.username,
            "discriminator": member.discriminator,
            "avatar": avatar
        };
        request.delete({
            url: url,
            body: postData,
            json: true
        }, function (error, response, body) {
            if (!body) return client.log("error", "db error while removing chests");
            if (body.error) {
                client.log("error", body.error);
                resolve(false);
            } else {
                client.log("log", `${member.username} (${member.id}) just lost ${number} Chests!`, "Chests")
                resolve(true);
            }
        });
    });
};
exports.getRandomChest = async() => {

    const items = [{
            name: "einen Lukas",
            freq: 1,
            run: function (client, message) {
                message.channel.send('*Lukas* : hey. you. wanna sub to my youtube channel? its free. 🕶 \n🔥 __***COME ON SUB MY FCKING YOUTUBE CHANNEL***__ 🔥 \nhttp://lukaas.de/youtube', new Attachment("./assets/imgs/lukas.jpg", "lukas.jpg"))
            }
        },
        {
            name: "NICHTS",
            freq: 1,
            run: function (client, message) {
                message.channel.send(new Attachment("./assets/gifs/loading.gif", "loading.gif"))
            }
        },
        {
            name: "eine Gomme-Explosion",
            freq: 3,
            run: function (client, message) {
                message.channel.send("<:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210>")
                message.channel.send(new Attachment("./assets/gifs/gommplosion.gif", "gommplosion.gif"))
            }
        },
        {
            name: "ein Einhorn",
            freq: 2,
            run: function (client, message) {
                message.channel.send('Meddl, ich bin ein Einhorn! 🦄')
            }
        },
        {
            name: "den Gommemode",
            freq: 2,
            run: function (client, message) {
                const role = message.guild.roles.find(r => r.name.toLowerCase() === "/gommemode");
                message.member.addRole(role, "Aus Kiste.")
                message.channel.send('Endlich kannst du `/gommemode` nutzen! <:gomme:313418733861470210>')
            }
        },
        {
            name: "einen XP-Boost",
            freq: 1,
            run: function (client, message) {
                message.channel.send("**So much XP!** Für deine Treue erhälst du **101 XP** auf Lukas' Nacken!");
                XPs.addXP(client, message.author, 101);
            }
        },
        {
            name: "einen Schlüsselanhänger",
            freq: 1,
            run: function (client, message) {
                message.channel.send({
                    embed: {
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
                    }
                });
                message.channel.send("Wie du noch zusätzlich einen 5%-Rabattcode erhälst, erfährst du per PN 😉", new Attachment("./assets/gifs/noice.gif", "noice.gif"));

                let msg = "**Registriere dich** auf https://sgd3d.de und **nimm an unserer Umfrage teil**: https://goo.gl/BjSUKd\n" +
                    "Diese dauert nur **ein paar Minuten** und wenn du zum Schluss deine Email-Adresse angibst, erhälst du direkt den **5%-Rabattcode** 😄\n" +
                    "Damit hilfst du bei der **Weiterentwicklung** von SGD3D 😛\n\n" +
                    "~ **CreepPlays** (SGD3D Entwickler)";

                message.member.send(msg);
            }
        },
        {
            name: "einen Design-Gutschein",
            freq: 1,
            run: function (client, message) {
                message.channel.send("Mehr gibt's per DM! 😉");
                message.guild.channels.get("318849797664538637").send(message.author.username + " (" + message.author.id + ") hat einen Design-Gutschein gewonnen!")
                let shops = [{
                    "name": "RadeArtz",
                    "discord": "RadeArtz | мσтιση ∂єѕιgη#9091",
                    "url": "shop.radeartz.de",
                    "rabatt": "5%"
                }]
                let list = ""
                for (let i = 0; i < shops.length; i++) {
                    let item = shops[i];
                    list += "- **" + item.name + "** *(" + item.url + ")* - " + item.rabatt;
                }
                message.author.send("**Yey!** Deinen Gutschein kannst du hier einlösen: 🎁 \n\n" + list + " \n\nUm ihn einzulösen, kontaktiere den Designer einfach per DM! 🖌")
            }
        }
    ];
    let lastFreq = 0,
        freqs = [];
    for (let item of items) {
        freqs.push({
            offset: lastFreq,
            item: item
        });
        lastFreq += item.freq;
    }
    let random = randomNum(0, lastFreq - 1);
    for (let freq of freqs) {
        if (random >= freq.offset && random <= freq.offset + freq.item.freq) {
            return freq.item;
        }
    }

    return items[0];
};