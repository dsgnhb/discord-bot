const Base = require('./Base.js')

const request = require('request')

class LevelsBase extends Base {
  constructor(client) {
    super(client)
  }

  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  async addChests(member, number) {
    const _this = this
    return new Promise((resolve, reject) => {
      let avatar = member.user.displayAvatarURL
      let size = avatar.indexOf('?size')
      if (size !== -1) avatar = avatar.slice(0, size)

      request.post(
        {
          url: this.client.config.apiEndpoint + '/levels/chests/' + member.user.id,
          body: {
            chests: number,
            username: member.user.username,
            discriminator: member.user.discriminator,
            avatar: avatar
          },
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error) reject(error)
          if (!body) reject('No Body!')
          if (body.error) reject(body.error)
          _this.client.log('log', `${member.user.username} (${member.user.id}) just earned ${number} Chests!`, 'Chests')
          resolve(true)
        }
      )
    })
  }
  async removeChests(member, number) {
    const _this = this
    return new Promise((resolve, reject) => {
      let avatar = member.user.displayAvatarURL
      let size = avatar.indexOf('?size')
      if (size !== -1) avatar = avatar.slice(0, size)
      let url = this.client.config.apiEndpoint + '/levels/chests/' + member.id
      let postData = {
        chests: number,
        username: member.username,
        discriminator: member.discriminator,
        avatar: avatar
      }
      request.delete(
        {
          url: url,
          body: postData,
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error) reject(error)
          if (!body) reject('No Body!')
          if (body.error) return resolve(false)

          _this.client.log('log', `${member.username} (${member.id}) just lost ${number} Chests!`, 'Chests')
          resolve(true)
        }
      )
    })
  }

  getRandomChest() {
    const { Attachment } = require('discord.js')
    const _this = this
    const items = [
      {
        name: 'einen Lukas',
        run: function(message) {
          message.channel.send(
            '*Lukas* : hey. you. wanna sub to my youtube channel? its free. 🕶 \n🔥 __***COME ON SUB MY FCKING YOUTUBE CHANNEL***__ 🔥 \nhttp://lukaas.de/youtube',
            new Attachment('./assets/imgs/lukas.jpg', 'lukas.jpg')
          )
        }
      },
      {
        name: 'NICHTS',
        run: function(message) {
          message.channel.send(new Attachment('./assets/gifs/loading.gif', 'loading.gif'))
        }
      },
      {
        name: 'eine Gommplosion',
        run: function(message) {
          message.channel.send(
            '<:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210><:gomme:313418733861470210>'
          )
          message.channel.send(new Attachment('./assets/gifs/gommplosion.gif', 'gommplosion.gif'))
        }
      },
      {
        name: 'ein Einhorn',
        run: function(message) {
          message.channel.send('Meddl, ich bin ein Einhorn! 🦄')
        }
      },
      {
        name: 'einen XP-Boost',
        run: function(message) {
          message.channel.send("**So much XP!** Für deine Treue erhälst du **101 XP** auf Lukas' Nacken! 💰")
          _this.addXP(message.member, 101)
        }
      },
      {
        name: 'eine Kiste',
        run: function(message) {
          message.channel.send('**Wow!** Das hat sich ja richtig gelohnt! Hier hast du noch **ne Kiste**... 👍 💎')
          _this.addChests(message.member, 2)
        }
      },
      {
        name: 'ein paar Coins',
        run: function(message) {
          const coins = _this.randomNum(10, 40)
          message.channel.send(`**Yeey!** Viel Spaß mit **${coins} Coins**! 👍 💎`)
          _this.addCoins(message.member)
        }
      },
      {
        name: 'einen Schlüsselanhänger',
        run: function(message) {
          message.channel.send({
            embed: {
              color: 3447003,
              author: {
                name: 'SGD3D',
                icon_url: 'https://puu.sh/xvAug/ca9e572b18.png'
              },
              title: 'Einen 3D-gedruckten dsgnhb-Schlusselanhänger!',
              url: 'https://sgd3d.de/product/designhub%20-%20Schl%C3%BCsselanh%C3%A4nger',
              description: 'Für nur 1€ pro Stück. So kannst du zeigen, dass du zur designhub-Community gehörst!',
              timestamp: new Date(),
              footer: {
                icon_url: 'https://puu.sh/xvAug/ca9e572b18.png',
                text: 'Ein cooler 3D-Druck-Onlineshop'
              }
            }
          })
          message.channel.send('Wie du noch zusätzlich einen 5%-Rabattcode erhälst, erfährst du per PN 😉', new Attachment('./assets/gifs/noice.gif', 'noice.gif'))

          let msg =
            '**Registriere dich** auf https://sgd3d.de und **nimm an unserer Umfrage teil**: https://goo.gl/BjSUKd\n' +
            'Diese dauert nur **ein paar Minuten** und wenn du zum Schluss deine Email-Adresse angibst, erhälst du direkt den **5%-Rabattcode** 😄\n' +
            'Damit hilfst du bei der **Weiterentwicklung** von SGD3D 😛\n\n' +
            '~ **CreepPlays** (SGD3D Entwickler)'

          message.member.send(msg)
        }
      },
      {
        name: 'einen Design-Gutschein',
        run: function(message) {
          message.channel.send("Mehr gibt's per DM! 😉")
          message.guild.channels.get('318849797664538637').send(message.author.username + ' (' + message.author.id + ') hat einen Design-Gutschein gewonnen!')
          let shops = [
            {
              name: 'RadeArtz',
              discord: 'RadeArtz | мσтιση ∂єѕιgη#9091',
              url: 'shop.radeartz.de',
              rabatt: '5%'
            }
          ]
          let list = ''
          for (let i = 0; i < shops.length; i++) {
            let item = shops[i]
            list += '- **' + item.name + '** *(' + item.url + ')* - ' + item.rabatt
          }
          message.author.send('**Yey!** Deinen Gutschein kannst du hier einlösen: 🎁 \n\n' + list + ' \n\nUm ihn einzulösen, kontaktiere den Designer einfach per DM! 🖌')
        }
      }
    ]
    return items[Math.floor(Math.random() * items.length)]
  }

  xpForLevel(n) {
    return 5 * (n ^ 2) + 50 * n + 100
  }
  xpToLevel(xp) {
    let remaining_xp = xp
    let level = 0
    while (remaining_xp >= this.xpForLevel(level)) {
      remaining_xp -= this.xpForLevel(level)
      level += 1
    }
    return level
  }
  xpForLevel(n) {
    return 5 * (n ^ 2) + 50 * n + 100
  }
  async addXP(member, number) {
    const _this = this
    return new Promise((resolve, reject) => {
      if (!number) number = this.randomNum(15, 20)

      let avatar = member.user.displayAvatarURL
      let size = avatar.indexOf('?size')
      if (size !== -1) avatar = avatar.slice(0, size)

      request.post(
        {
          url: this.client.config.apiEndpoint + '/levels/xp/' + member.user.id,
          body: { xp: number, username: member.user.username, discriminator: member.user.discriminator, avatar: avatar },
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        async (error, response, body) => {
          if (error) reject(error)
          if (!body) reject('No Body!')
          if (body.error) reject(body.error)

          _this.client.log('log', `${member.user.username} (${member.user.id}) just earned ${number} XP!`, 'XP')

          let oldLevel = _this.xpToLevel(body.oldXP)
          let newLevel = _this.xpToLevel(body.newXP)

          const rewards = require('../../configs/rewards.json')

          for (let i = 0; i < rewards.length; i++) {
            let reward = rewards[i]
            if (!newLevel >= reward.lvl) break

            let role = member.guild.roles.find(r => r.name === reward.name)
            if (!role) {
              try {
                role = await member.guild.createRole({
                  name: reward.name,
                  color: reward.color
                })
                _this.client.log(`Created role ${role.name}`)
              } catch (e) {
                reject(e)
              }
            }
            member.addRole(role, 'Earned cause of level ' + newLevel)
          }

          if (newLevel > oldLevel) {
            if (newLevel % 2 === 0) {
              try {
                const coins = 100 + newLevel * 2
                _this.addCoins(member, coins)
                _this.client.users.get(member.user.id).send(`Hey! Du bist jetzt **Level ${newLevel}** ! Viel Spaß mit **${coins} Coins!**`)
              } catch (error) {
                reject(error)
              }
            } else {
              _this.client.users.get(member.user.id).send(`Hey! Du bist jetzt **Level ${newLevel}** !`)
            }
          }
          return resolve(true)
        }
      )
    })
  }
  async removeXP(member, number) {
    const _this = this
    return new Promise((resolve, reject) => {
      let avatar = member.user.displayAvatarURL
      let size = avatar.indexOf('?size')
      if (size !== -1) avatar = avatar.slice(0, size)

      request.delete(
        {
          url: this.client.config.apiEndpoint + '/levels/xp/' + member.user.id,
          body: { xp: number, username: member.user.username, discriminator: member.user.discriminator, avatar: avatar },
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error) reject(error)
          if (!body) reject('No Body!')

          if (body.error) return resolve(false)
          _this.client.log('log', `${member.user.username} (${member.user.id}) just lost ${number} XP!`, 'XP')
          resolve(true)
        }
      )
    })
  }
  async addCoins(member, number) {
    const _this = this
    return new Promise((resolve, reject) => {
      if (!number) number = this.randomNum(15, 20)

      let avatar = member.user.displayAvatarURL
      let size = avatar.indexOf('?size')
      if (size !== -1) avatar = avatar.slice(0, size)

      request.post(
        {
          url: this.client.config.apiEndpoint + '/levels/coins/' + member.user.id,
          body: { coins: number, username: member.user.username, discriminator: member.user.discriminator, avatar: avatar },
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error) reject(error)
          if (!body) reject('No Body!')
          if (body.error) reject(body.error)

          _this.client.log('log', `${member.user.username} (${member.user.id}) just earned ${number} Coins!`, 'Coins')
          resolve(true)
        }
      )
    })
  }
  async removeCoins(member, number) {
    const _this = this
    return new Promise((resolve, reject) => {
      let avatar = member.user.displayAvatarURL
      let size = avatar.indexOf('?size')
      if (size !== -1) avatar = avatar.slice(0, size)

      request.delete(
        {
          url: this.client.config.apiEndpoint + '/levels/coins/' + member.user.id,
          body: { coins: number, username: member.user.username, discriminator: member.user.discriminator, avatar: avatar },
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error) reject(error)
          if (!body) reject('No Body!')

          if (body.error) return resolve(false)
          _this.client.log('log', `${member.user.username} (${member.user.id}) just lost ${number} Coins!`, 'Coins')
          resolve(true)
        }
      )
    })
  }
  async getData(member) {
    const _this = this
    return new Promise((resolve, reject) => {
      let url = this.client.config.apiEndpoint + '/levels/' + member.user.id
      request.get(
        {
          url: url,
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error) reject(error)
          if (!body) reject('No Body!')
          if (body.error) reject(error)
          if (!body.xp) resolve(false)

          let level = _this.xpToLevel(body.xp)
          let remainingXP = 0
          let x = 0
          for (let i = 0; i < level; i++) {
            x += _this.xpForLevel(i)
            remainingXP = body.xp - x
          }
          let data = {
            rank: body.rank,
            totalXP: body.xp,
            level: _this.xpToLevel(body.xp),
            levelXP: _this.xpForLevel(level),
            remainingXP: remainingXP,
            chests: body.chests,
            coins: body.coins
          }
          resolve(data)
        }
      )
    })
  }
}

module.exports = LevelsBase
