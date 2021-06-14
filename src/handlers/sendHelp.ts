import { Context } from 'telegraf'

export function sendHelp(ctx: Context) {
  return ctx.reply(
    'Just add @DeleteNudesBot to a group, give it rights to delete messages and you are done. No more fear of your group being banned for explicit content. Code sources: bit.ly/2SoTlF2. Updates channel and support: @borodutch_support.',
    { disable_web_page_preview: true }
  )
}
