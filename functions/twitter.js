const Twit = require('twit')
const { RichEmbed } = require('discord.js')

module.exports = client => {
  const twitter = new Twit(client.config.tokens.twitter)

  const ShortTech = twitter.stream('statuses/filter', { follow: '826091131062595586' })

  ShortTech.on('tweet', tweet => {
    if (tweet.retweeted_status || tweet.user.id_str != user || tweet.in_reply_to_status_id != null) return

    const embed = new RichEmbed()
      .setColor('#1DA1F2')
      .setAuthor(`${tweet.user.name} (@${tweet.user.screen_name})`)
      .setURL(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
      .setFooter('Twitter', 'http://evie.ban-hammered.me/i/0lr7k.png')
      .setTimestamp(new Date())
      .setDescription(tweet.text)
      .setThumbnail(tweet.user.profile_image_url)

    if (tweet.entities.media) embed.setImage(tweet.entities.media[0].media_url)
    client.channels.get('368471203532242965').send({ embed })
    client.log('Log', `New Tweet by @${user}: ${tweet.text}`, 'Twitter')
  })

  ShortTech.on('connect', () => client.log('Log', 'Connecting to Twitter API', 'Twitter'))
  ShortTech.on('connected', () => client.log('Log', 'Connected to Twitter API', 'Twitter'))
  ShortTech.on('disconnect', disconnectMessage => client.log('Log', `Disconnected from Twitter API: ${disconnectMessage}`, 'Twitter'))
  ShortTech.on('reconnect', () => client.log('Log', 'Reconnecting to Twitter API', 'Twitter'))
  ShortTech.on('warning', warning => client.log('Log', `Warning from Twitter API: ${warning}`, 'Twitter'))

  const mydayondsgnhb = twitter.stream('statuses/filter', { track: '#mydayondsgnhb' })

  mydayondsgnhb.on('tweet', tweet => {
    if (tweet.retweeted_status || tweet.user.id_str != user || tweet.in_reply_to_status_id != null) return

    const embed = new RichEmbed()
      .setColor('#1DA1F2')
      .setAuthor(`${tweet.user.name} (@${tweet.user.screen_name})`)
      .setURL(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`)
      .setFooter('Twitter', 'http://evie.ban-hammered.me/i/0lr7k.png')
      .setTimestamp(new Date())
      .setDescription(tweet.text)
      .setThumbnail(tweet.user.profile_image_url)

    if (tweet.entities.media) embed.setImage(tweet.entities.media[0].media_url)
    client.channels.get('430104709957943296').send({ embed })
    client.log('Log', `New Tweet by @${user}: ${tweet.text}`, 'Twitter')
  })

  mydayondsgnhb.on('connect', () => client.log('Log', 'Connecting to Twitter API', 'Twitter'))
  mydayondsgnhb.on('connected', () => client.log('Log', 'Connected to Twitter API', 'Twitter'))
  mydayondsgnhb.on('disconnect', disconnectMessage => client.log('Log', `Disconnected from Twitter API: ${disconnectMessage}`, 'Twitter'))
  mydayondsgnhb.on('reconnect', () => client.log('Log', 'Reconnecting to Twitter API', 'Twitter'))
  mydayondsgnhb.on('warning', warning => client.log('Log', `Warning from Twitter API: ${warning}`, 'Twitter'))
}
