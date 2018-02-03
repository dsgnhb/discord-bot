const inquirer = require('inquirer')
const Enmap = require('enmap')
const EnmapLevel = require('enmap-level')
const fs = require('fs')

const wait = require('util').promisify(setTimeout)

let prompts = [
  {
    type: 'confirm',
    name: 'resetDefaults',
    message: 'Do you want to reset default settings?',
    default: false
  },
  {
    type: 'input',
    name: 'tokenDiscord',
    message: 'DISCORD: Please enter the bot token from the application page. (https://discordapp.com/developers/applications/me)'
  },
  {
    type: 'input',
    name: 'ownerID',
    message: 'DISCORD: Please enter the your Discord User ID'
  },
  {
    type: 'input',
    name: 'apiEndpoint',
    message: 'API: Please enter the API Endpoint for the designhub API'
  },
  {
    type: 'input',
    name: 'tokenAPI',
    message: 'API: Please enter your API key'
  },
  {
    type: 'input',
    name: 'mainGuildID',
    message: 'LOGGING: Please enter the guild ID from your Discord Server'
  },
  {
    type: 'input',
    name: 'logChannel',
    message: 'LOGGING: Please enter the channel ID on your Main Discord provided above'
  },
  {
    type: 'confirm',
    name: 'levelSystem',
    message: 'LEVELS: Do you want to enable the LevelSystem?',
    default: true
  },
  {
    type: 'input',
    name: 'tokenCleverbot',
    message: 'CLEVERBOT: Please enter the Cleverbot API key'
  },
  {
    type: 'input',
    name: 'tokenTwitterConsumerKey',
    message: 'TWITTER: Please enter the Twitter API Consumer Key'
  },
  {
    type: 'input',
    name: 'tokenTwitterConsumerSecret',
    message: 'TWITTER: Please enter the Twitter API Consumer Secret'
  },
  {
    type: 'input',
    name: 'tokenTwitterAccessToken',
    message: 'TWITTER: Please enter the Twitter API Access Token'
  },
  {
    type: 'input',
    name: 'tokenTwitterAccessTokenSecret',
    message: 'TWITTER: Please enter the Twitter API Access Token Secret'
  }
]

const defaultSettings = `{
    "prefix": "!",
    "embedFooter": "designhub.fun",
    "embedColor": "0x2eabbf",
    "embedIcon": "https://designhub.fun/dl/avatar%20designhub2.jpg"
  }`

let exampleConfig = fs.readFileSync('./configs/config.example.json', 'utf8')

const settings = new Enmap({ provider: new EnmapLevel({ name: 'settings' }) })
;(async function() {
  console.log('Setting Up Configuration...')
  await wait(1000)
  await settings.defer
  if (!settings.has('default')) {
    prompts = prompts.slice(1)
    console.log('First Start! Inserting default guild settings in the database...')
    await settings.set('default', defaultSettings)
    await settings.close()
  }

  const answers = await inquirer.prompt(prompts)

  if (answers.resetDefaults && answers.resetDefaults === true) {
    console.log('Resetting default guild settings...')
    await settings.set('default', defaultSettings)
    await settings.close()
  }

  exampleConfig = exampleConfig
    .replace('{{ownerID}}', answers.ownerID)
    .replace('{{apiEndpoint}}', answers.apiEndpoint)
    .replace('{{mainGuildID}}', answers.mainGuildID)
    .replace('{{logChannel}}', answers.logChannel)
    .replace('{{levelSystem}}', answers.levelSystem)
    .replace('{{tokenDiscord}}', answers.tokenDiscord)
    .replace('{{tokenAPI}}', answers.tokenAPI)
    .replace('{{tokenCleverbot}}', answers.tokenCleverbot)
    .replace('{{tokenTwitterConsumerKey}}', answers.tokenTwitterConsumerKey)
    .replace('{{tokenTwitterConsumerSecret}}', answers.tokenTwitterConsumerSecret)
    .replace('{{tokenTwitterAccessToken}}', answers.tokenTwitterAccessToken)
    .replace('{{tokenTwitterAccessTokenSecret}}', answers.tokenTwitterAccessTokenSecret)

  fs.writeFileSync('./configs/config.json', exampleConfig)

  console.log('REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!')
  console.log('Configuration has been written, enjoy!')
})()
