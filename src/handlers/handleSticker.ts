import { Context } from 'telegraf'
import { isExplicit } from '@/helpers/isExplicit'

export async function handleSticker(ctx: Context) {
  const photo = (ctx.update as any).message.sticker
  const photoPileId = photo.file_id
  const file = await ctx.telegram.getFile(photoPileId)
  const isExplicitPhoto = await isExplicit(file, true)
  if (isExplicitPhoto) {
    return ctx.deleteMessage()
  }
}
