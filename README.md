# Discord Bot
Discord Bot running designhub's Discord Server based on GuideBot from AnIdiotsGuide written in discord.js
**Fell free to contribute if any feature's missing**
***

## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 8.0.0 or higher](https://nodejs.org)

You also need your bot's token. This is obtained by creating an application in
the Developer section of discordapp.com. Check the [first section of this page](https://anidiots.guide/getting-started/the-long-version.html)
for more info.

## Downloading

In a command prompt in your projects folder (wherever that may be) run the following:

`git clone https://github.com/dsgnhb/discord-bot.git`

Once finished:

- In the folder from where you ran the git command, run `cd discord-bot` and then run `npm install`
- Change directory to 'configs/'
- Rename `config.example.json` to `config.json`
- Edit `config.json` and enter your token and other details as indicated. It should look like this afterwards:

```json
  {
      "ownerID": "170828613841715203",
      "apiEndpoint": "https://api.dsgnhb.de/",
      "logChannel": "353208744206663681",
      "mainGuildID" : "202825877250244608",
      "levelSystem" : true,
      "tokens" : {
        "discord": "yourdiscordbottoken",
        "api":"secret:P",
        "cleverbot": "somecleverbotapitoken"
      },
      "defaultSettings" : {
        "prefix": "!",
        "embedFooter": "designhub.party",
        "embedColor": "0x2eabbf",
        "embedIcon": "https://dsgnhb.de/dl/avatar%20designhub2.jpg"
      }
    }
```
> The token in the above example belongs to a deleted bot.

## Starting the bot

To start the bot, in the command prompt, run the following command:
`node app.js`

## Inviting to a guild

To add the bot to your guild, you have to get an oauth link for it.

You can use this site to help you generate a full OAuth Link, which includes a calculator for the permissions:
[https://finitereality.github.io/permissions-calculator/?v=0](https://finitereality.github.io/permissions-calculator/?v=0)

***
Authors: flo (https://flooo.me), lukas (https://lukaas.de), fin (https://angu.li), alex (https://github.com/CreepPlaysDE)