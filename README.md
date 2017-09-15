# designhub-discord-bot
Discord Bot running designhub's Discord Server based on GuideBot from AnIdiotsGuide written in discord.js

***

## config.json
Rename `config.example.json` to `config.json` and fill out the requested fields.
```json
  {
      "ownerID": "ID OF BOT OWNER (YOU)",
      "apiEndpoint": "URL TO DESIGNHUB API",
      "logChannel": "ID OF CHANNEL FOR LOGGING",
      "mainGuildID" : "ID OF BOT OWNER'S GUILD (USED FOR LOGGING)",
      "levelSystem" : false,
      "tokens" : {
        "discord": "DISCORD TOKEN",
        "api":"DESIGNHUB API TOKEN",
        "cleverbot": "CLEVERBOT API TOKEN"
      },
      "defaultSettings" : {
        "prefix": "!",
        "embedFooter": "designhub.party",
        "embedColor": "0x2eabbf",
        "embedIcon": "https://dsgnhb.de/dl/avatar%20designhub2.jpg"
      }
    }
```
## Installing packages
```
  npm install
```
## Start Discord-Bot
```
  node app.js
```

***
Author: flo (https://flooo.me)
