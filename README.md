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
      "tokens" : {
        "discord": "DISCORD TOKEN",
        "api":"DESIGNHUB API TOKEN",
        "cleverbot": "CLEVERBOT API TOKEN"
      },
      "defaultSettings" : {
        "prefix": "!",
        "embedFooter": "designhub.party",
        "embedColor": "0x2eabbf",
        "welcomeEnabled": "false",
        "welcomeChannel": "welcome",
        "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D"
      }
    }
```
## Installing packages
```
  npm install
```

***
Author: flo (https://flooo.me)
