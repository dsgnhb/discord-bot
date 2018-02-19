# Discord Bot [![MegaOP](https://img.shields.io/badge/MEGA%20OP-%E2%9C%94-green.svg)](http://designhub.fun) [![Discord](https://discordapp.com/api/guilds/202825877250244608/embed.png)](https://dsgnhb.de/discord)
Discord Bot running designhub's Discord Server based on GuideBot from AnIdiotsGuide written in discord.js
**Fell free to contribute if any feature's missing**
***

## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 8.0.0 or higher](https://nodejs.org)
- `Cario` York Dev uses [canvas](https://www.npmjs.com/package/canvas), you will need to install all prerequisites for your operating system.

You also need your bot's token. This is obtained by creating an application in
the Developer section of discordapp.com. Check the [first section of this page](https://anidiots.guide/getting-started/the-long-version.html)
for more info.

## Installing Canvas Dependencies

OS | Command
----- | -----
OS X | `sudo brew install pkg-config cairo pango libpng jpeg giflib`
Ubuntu | `sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++`
Fedora | `sudo yum install cairo cairo-devel cairomm-devel libjpeg-turbo-devel pango pango-devel pangomm pangomm-devel giflib-devel`
Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto`
Windows | [Instructions on their wiki](https://github.com/Automattic/node-canvas/wiki/Installation---Windows)

## Downloading

In a command prompt in your project's folder (wherever that may be) run the following:

`git clone https://github.com/dsgnhb/discord-bot.git`

Once finished:

- In the folder from where you ran the git command, run `cd discord-bot` and then run `npm install`, this will install all required packages, then it will run the installer.

- You will be prompted to supply a number of access tokens and keys for various platforms, please follow the on screen instructions to complete the installation.

>***NOTE:*** A config file will be created for you.

## Starting the bot

To start the bot, in the command prompt, run the following command:
`node app.js`

## Inviting to a guild

To add the bot to your guild, you have to get an oauth link for it.

You can use this site to help you generate a full OAuth Link, which includes a calculator for the permissions:
[https://finitereality.github.io/permissions-calculator/?v=0](https://finitereality.github.io/permissions-calculator/?v=0)


## Contributing

This project uses [gitmoji](https://gitmoji.carloscuesta.me/) for all commit messages:

Gitmoji is an initiative to standardize and explain the use of emojis on GitHub commit messages. Using emojis on commit messages provides an easy way of identifying the purpose or intention of a commit.

***
Authors: flo (https://flooo.me), lukas (https://lukaas.de), fin (https://angu.li), alex (https://github.com/CreepPlaysDE)