import { Context } from 'telegraf'
import { isExplicit } from '@/helpers/isExplicit'

export async function handlePhoto(ctx: Context) {
  const photo = (ctx.update as any).message.photo.pop()
  const photoFileId = photo.file_id
  const file = await ctx.telegram.getFile(photoFileId)
  const isExplicitPhoto = await isExplicit(file)
  if (isExplicitPhoto) {
    return ctx.deleteMessage()
  }
}
