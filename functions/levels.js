const PersistentCollection = require("djs-collection-persistent");
const Chests = require("./chests.js");
class Levels {
    static xpForLevel(n) {
        return 5*(n**2)+50*n+100
    }
    static xpToLevel(xp) {
        let remaining_xp = xp
        let level = 0;
        while(remaining_xp >= Levels.xpForLevel(level)) {
            remaining_xp -= Levels.xpForLevel(level)
            level += 1
        }
        return level;
    }
    static randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static addXP(client, userID, xp) {
        if(!xp)  xp = Levels.randomNum(15,20)

        const data = Levels.getData(client, userID)
        let oldLevel = Levels.xpToLevel(data.xp)
        let newLevel = Levels.xpToLevel(data.xp+xp)

        data.xp = data.xp+xp;
        Levels.saveData(client, userID, data);

        if(newLevel > oldLevel) {
            if((newLevel%2) == 0) {
                Chests.addChest(client, userID)
                client.users.get(userID).send(`Hey! Du bist jetzt **Level ${newLevel}** ! Du hast eine neue Kiste.`)
            } else {
                client.users.get(userID).send(`Hey! Du bist jetzt **Level ${newLevel}** !`) 
            }
        }
    }
    static getData(client, userID) {
        const data = client.levels.get(userID) || { xp: 0, chests: 0 };
        return data;
    }
    static saveData(client, userID, data) {
        client.levels.set(userID, data)
    }
}
module.exports = Levels;