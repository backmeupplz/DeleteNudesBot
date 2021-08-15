import { Context } from 'telegraf'
import { isExplicit } from '@/helpers/isExplicit'

export async function handleSticker(ctx: Context) {
  console.log((ctx.update as any).message.sticker)
  const photo = (ctx.update as any).message.sticker
  const photoPileId = photo.file_id
  const file = await ctx.telegram.getFile(photoPileId)
  const isExplicitPhoto = await isExplicit(file, true)
  if (isExplicitPhoto) {
    return ctx.deleteMessage()
  }
}
