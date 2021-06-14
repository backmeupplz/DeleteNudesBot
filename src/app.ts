// Setup @/ aliases for modules
import 'module-alias/register'
// Config dotenv
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
// Dependencies
import { bot } from '@/helpers/bot'
import { ignoreOldMessageUpdates } from '@/middlewares/ignoreOldMessageUpdates'
import { sendHelp } from '@/handlers/sendHelp'
import { handlePhoto } from '@/handlers/handlePhoto'
import { attachChat } from '@/middlewares/attachChat'

// Middlewares
bot.use(ignoreOldMessageUpdates)
bot.use(attachChat)
// Commands
bot.command(['help', 'start'], sendHelp)
// Handlers
bot.on('photo', handlePhoto)
// Errors
bot.catch(console.error)
// Start bot
bot.launch().then(() => {
  console.info(`Bot ${bot.botInfo.username} is up and running`)
})
