const Monitor = require('./Monitor.js')

class LevelsMonitor extends Monitor {
  constructor(client, options) {
    super(
      client,
      Object.assign(options, {
        category: 'Levels',
        dm: false,
        guild: true,
        maxPermLevel: 10
      })
    )
  }
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  async addChests(member, number) {
    const _this = this
    return new Promise((resolve, reject) => {
      let avatar = member.displayAvatarURL
      let size = avatar.indexOf('?size')
      if (size !== -1) avatar = avatar.slice(0, size)

      request.post(
        {
          url: this.client.config.apiEndpoint + '/levels/chests/' + member.id,
          body: {
            chests: number,
            username: member.username,
            discriminator: member.discriminator,
            avatar: avatar
          },
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error || !body) reject(error)
          if (body.error) reject(body.error)
          _this.client.log('log', `${member.username} (${member.id}) just earned ${number} Chests!`, 'Chests')
          resolve(true)
        }
      )
    })
  }
  async removeChests(member, number) {
    const _this = this
    return new Promise((resolve, reject) => {
      let avatar = member.displayAvatarURL
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
          if (error || !body) reject(error)
          if (body.error) resolve(false)

          _this.client.log('log', `${member.username} (${member.id}) just lost ${number} Chests!`, 'Chests')
          resolve(true)
        }
      )
    })
  }

  getRandomChest() {
    const _this = this
    const items = [
      {
        name: 'einen Test',
        run: function(message) {
          message.channel.send(_this.client.ping)
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

      let avatar = member.avatarURL
      let size = avatar.indexOf('?size')
      if (size !== -1) avatar = avatar.slice(0, size)

      request.post(
        {
          url: this.client.config.apiEndpoint + '/levels/xp/' + member.id,
          body: { xp: number, username: member.username, discriminator: member.discriminator, avatar: avatar },
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error || !body) reject(error)
          if (body.error) reject(body.error)

          _this.client.log('log', `${member.username} (${member.id}) just earned ${number} XP!`, 'XP')

          let oldLevel = _this.xpToLevel(body.oldXP)
          let newLevel = _this.xpToLevel(body.newXP)
          if (newLevel > oldLevel) {
            if (newLevel % 2 === 0) {
              try {
                const success = _this.addChests(member, 1)
                _this.client.users.get(member.id).send(`Hey! Du bist jetzt **Level ${newLevel}** ! Du hast eine neue Kiste.`)
              } catch (error) {
                console.log(error)
              }
            } else {
              _this.client.users.get(member.id).send(`Hey! Du bist jetzt **Level ${newLevel}** !`)
            }
          }
          resolve(true)
        }
      )
    })
  }
  async removeXP(member, number) {
    const _this = this
    return new Promise((resolve, reject) => {
      let avatar = member.displayAvatarURL
      let size = avatar.indexOf('?size')
      if (size !== -1) avatar = avatar.slice(0, size)

      request.delete(
        {
          url: this.client.config.apiEndpoint + '/levels/xp/' + member.id,
          body: { xp: number, username: member.username, discriminator: member.discriminator, avatar: avatar },
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error || !body) reject(error)
          if (body.error) resolve(false)
          _this.client.log('log', `${member.username} (${member.id}) just lost ${number} XP!`, 'XP')
          resolve(true)
        }
      )
    })
  }
  async getData(member) {
    const _this = this
    return new Promise((resolve, reject) => {
      let url = this.client.config.apiEndpoint + '/levels/' + member.id
      request.get(
        {
          url: url,
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error) console.log(error)

          if (body.error) {
            _this.client.log('error', body.error)
            reject(error)
          } else if (!body.xp) {
            resolve(false)
          } else {
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
              chests: body.chests
            }
            resolve(data)
          }
        }
      )
    })
  }
}
module.exports = LevelsMonitor
