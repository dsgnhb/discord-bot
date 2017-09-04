const PersistentCollection = require("djs-collection-persistent");

class Chests {
    static addChest(client, userID) {
        const data = Chests.getData(client, userID)
        data.chests++;
        Chests.saveData(client, userID, data);
    }
    static removeChest(client, userID) {
        const data = Chests.getData(client, userID)
        if(!data.chests == 0) {
            data.chests--;
            return true;
        } else {
           return false;
        }
        Chests.saveData(client, userID, data);
    }
    static getData(client, userID) {
        const data = client.levels.get(userID) || { xp: 0, chests: 0 };
        return data;
    }
    static saveData(client, userID, data) {
        client.levels.set(userID, data)
    }
    static getRandomChest() {
        const items = [
            {
                name: "item1",
                freq: 1,
                action: "message.channel.send('won item1!')"
            },
            {
                name: "item2",
                freq: 5,
                action: "message.channel.send('won item2!')"
            }
        ]
        let sumFreq = 0;
        for(i=0; i<items.length; i++) {
            sumFreq =+ items[i].freq;
        }
        randomFreq = randomNum(0, sumFreq)
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