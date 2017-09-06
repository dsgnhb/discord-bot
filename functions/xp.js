const request = require("request");
const Chests = require("./chests.js");
class XPs {
    static xpForLevel(n) {
        return 5*(n^2)+50*n+100
    }
    static xpToLevel(xp) {
        let remaining_xp = xp
        let level = 0;
        while(remaining_xp >= XPs.xpForLevel(level)) {
            remaining_xp -= XPs.xpForLevel(level)
            level += 1
        }
        return level;
    }
    static randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static addXP(client, member, number) {
        if(!number)  number = XPs.randomNum(15,20)

        let avatar = member.displayAvatarURL
        var size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);

        var url = client.config.apiEndpoint+"/levels/xp/"+member.id;
        var postData = { "xp": number, "username": member.username, "avatar": avatar};
        request.post({
            url: url,
            body: postData,
            json: true
        }, function(error, response, body) {
            if(!body) return client.log("error", "db error while adding xp");
            if(body.error) client.log("error", body);

            let oldLevel = XPs.xpToLevel(body.oldXP)
            let newLevel = XPs.xpToLevel(body.newXP)
    
            if(newLevel > oldLevel) {
                if((newLevel%2) == 0) {
                    Chests.addChests(client, member, 1)
                    client.users.get(member.id).send(`Hey! Du bist jetzt **Level ${newLevel}** ! Du hast eine neue Kiste.`)
                } else {
                    client.users.get(member.id).send(`Hey! Du bist jetzt **Level ${newLevel}** !`) 
                }
            }

        });
    }
    static removeXP(client, member, number) {
        let avatar = member.displayAvatarURL
        var size = avatar.indexOf("?size");
        avatar = avatar.slice(0, size);

        var url = client.config.apiEndpoint+"/levels/xp/"+member.id;
        var postData = { "xp": number, "username": member.username, "avatar": avatar};
        request.delete({
            url: url,
            body: postData,
            json: true
        }, function(error, response, body) {
            if(!body) return client.log("error", "db error while adding xp");
            if(body.error) client.log("error", body);
            if(body.error = "user has not enough xp") return false;
            return true;
        });
    }
}
module.exports = XPs;