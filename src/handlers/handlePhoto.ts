import { Context } from 'telegraf'
import axios from 'axios'
const nsfw = require('nsfwjs')
const tf = require('@tensorflow/tfjs-node')

export async function handlePhoto(ctx: Context) {
  const photo = (ctx.update as any).message.photo[0]
  const photoPileId = photo.file_id
  const file = await ctx.telegram.getFile(photoPileId)
  const pic = await axios.get(
    `https://api.telegram.org/file/bot${process.env.TOKEN}/${file.file_path}`,
    {
      responseType: 'arraybuffer',
    }
  )
  console.log(`Got photo with id ${file.file_id}`)
  const model = await nsfw.load(process.env.MODEL)
  const image = await tf.node.decodeImage(pic.data, 3)
  const predictions = await model.classify(image)
  console.log(`Predictions for photo with id ${file.file_id}:`, predictions)
  image.dispose()
  for (const prediction of predictions) {
    if (
      ['Porn', 'Hentai'].includes(prediction.className) &&
      prediction.probability > 0.6
    ) {
      console.log(`Photo with id ${file.file_id} is NSFW`)
      return ctx.deleteMessage()
    }
  }
  console.log(`Photo with id ${file.file_id} is SFW`)
}
