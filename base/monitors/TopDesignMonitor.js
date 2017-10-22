const Monitor = require('./Monitor.js')

class TopDesignMonitor extends Monitor {
  constructor(client, options) {
    super(
      client,
      Object.assign(options, {
        category: 'Design',
        dm: false,
        guild: true,
        maxPermLevel: 10
      })
    )
  }
  getPostID(args) {
    let postid = args[0]
    if (!postid) return false
    if (postid.startsWith('#')) postid = postid.substring(1, 20)
    postid = Number(postid)
    if (!postid) return false
    if (!Number.isInteger(postid)) return false
    return postid
  }
  voteOrVotes(likes) {
    if (likes == 1) return 'Vote'
    else return 'Votes'
  }
  timeshort(date) {
    let monthInt = date.getMonth() + 1
    let year = date.getFullYear()
    return '' + year + monthInt
  }
  async deletePost(postID) {
    return new Promise((resolve, reject) => {
      request.del(
        {
          url: this.client.config.apiEndpoint + '/topdesign/posts/' + postID,
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error || !body) reject(error)
          if (body == 'Not found') resolve(false)
          if (body.action == 'delete') resolve(true)
        }
      )
    })
  }
  async votePost(postID, userID) {
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: this.client.config.apiEndpoint + '/topdesign/vote/' + postID,
          json: true,
          body: {
            userid: userID
          },
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error || !body) reject(error)
          if (body == 'Not found') resolve(false)
          resolve(body)
        }
      )
    })
  }
  async statusPost(postID) {
    return new Promise((resolve, reject) => {
      request.put(
        {
          url: this.client.config.apiEndpoint + '/topdesign/posts/' + postID,
          json: true,
          headers: {
            Token: this.client.config.tokens.api
          }
        },
        function(error, response, body) {
          if (error || !body) reject(error)
          if (body == 'Not found') resolve(false)
          resolve(body)
        }
      )
    })
  }
  async getPost(postID) {
    return new Promise((resolve, reject) => {
      request.get(
        {
          url: this.client.config.apiEndpoint + '/topdesign/posts/' + postID,
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error || !body || body.error) reject(error)
          resolve(body)
        }
      )
    })
  }
  async getPosts() {
    return new Promise((resolve, reject) => {
      request.get(
        {
          url: this.client.config.apiEndpoint + '/topdesign/posts/currentmonth',
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error || !body) reject(error)
          if (body == []) reject(false)
          resolve(body)
        }
      )
    })
  }
  async getVoted(userID, timeshort) {
    return new Promise((resolve, reject) => {
      request.get(
        {
          url: this.client.config.apiEndpoint + '/topdesign/voted/' + userID,
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {
          if (error || !body || body.error) reject(error)
          if (!body.hasOwnProperty(timeshort)) reject(false)
          const month = body[timeshort]
          resolve(month)
        }
      )
    })
  }
  async addPost(member, image) {
    const _this = this
    return new Promise((resolve, reject) => {
      let avatar = message.author.displayAvatarURL
      let size = avatar.indexOf('?size')
      if (size !== -1) avatar = avatar.slice(0, size)

      request.post(
        {
          url: this.client.config.apiEndpoint + '/topdesign/posts',
          body: { image: image, content: '#topdesign', username: member.username, userid: member.id, avatar: avatar },
          json: true,
          headers: { Token: client.config.tokens.api }
        },
        function(error, response, body) {
          if (error || !body || body.error) reject(error)
          if (body.action === 'add') resolve(body)
        }
      )
      request.post(
        {
          url: url,
          body: postData,
          json: true,
          headers: { Token: this.client.config.tokens.api }
        },
        function(error, response, body) {}
      )
    })
  }
}

module.exports = TopDesignMonitor
