import { findChat } from '@/models'
import { Context } from 'telegraf'

export async function attachChat(ctx: Context, next: () => void) {
  ctx.dbchat = await findChat(ctx.from.id)
  return next()
}
