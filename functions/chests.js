const request = require("request");

class Chests {
    static randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static addChests(client, member, number) {
        let avatar = member.displayAvatarURL
        var size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);

        var url = client.config.apiEndpoint+"/levels/chests/"+member.id;
        var postData = { "chests": number, "username": member.username, "discriminator": member.discriminator, "avatar": avatar};
        request.post({
            url: url,
            body: postData,
            json: true
        }, function(error, response, body) {
            if(!body) return client.log("error", "db error while adding Chests");
            if(body.error) client.log("error", body);
        });
    }
    static removeChests(client, member, number) {
        let avatar = member.displayAvatarURL
        var size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);

        var url = client.config.apiEndpoint+"/levels/chests/"+member.id;
        var postData = { "chests": number, "username": member.username, "discriminator": member.discriminator, "avatar": avatar};
        request.delete({
            url: url,
            body: postData,
            json: true
        }, function(error, response, body) {
            if(!body) return client.log("error", "db error while adding chests");
            if(body.error) {
                client.log("error", body.error);
                return false;
            } else { 
                return true;
            }
        });
    }
    static getRandomChest() {
        const items = [
            {
                name: "item1",
                freq: 1,
                run : function(message) { message.channel.send('won item1!') }
            },
            {
                name: "item2",
                freq: 5,
                run : function(message) { message.channel.send('won item2!') }
            }
        ]
        let sumFreq = 0;
        for(i=0; i<items.length; i++) {
            sumFreq =+ items[i].freq;
        }
        let randomFreq = Chests.randomNum(0, sumFreq)
        var freq = 0
        for (var i = 0; i < items.length; i++) {
            freq =+ items[i].freq
            if(randomFreq <= freq) {
                return items[i]
            }
        }
    }
}
module.exports = Chests;