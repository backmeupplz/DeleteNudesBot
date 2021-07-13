import { File } from 'typegram'
const nsfw = require('nsfwjs')
const tf = require('@tensorflow/tfjs-node')
import axios from 'axios'
const sharp = require('sharp')

const threshold = 0.8

tf.enableProdMode()

let model
;(async () => {
  model = await nsfw.load(process.env.MODEL)
})()

export async function isExplicit(file: File, convertToPNG = false) {
  if (!model) {
    return false
  }
  const pic = await axios.get(
    `https://api.telegram.org/file/bot${process.env.TOKEN}/${file.file_path}`,
    {
      responseType: 'arraybuffer',
    }
  )
  let buffer = pic.data
  if (convertToPNG) {
    buffer = await sharp(buffer).jpeg().toBuffer()
  }
  console.log(`Got photo with id ${file.file_id}`)
  const image = await tf.node.decodeImage(buffer, 3)
  const predictions = await model.classify(image)
  console.log(`Predictions for photo with id ${file.file_id}:`, predictions)
  image.dispose()
  for (const prediction of predictions) {
    if (
      ['Porn', 'Hentai'].includes(prediction.className) &&
      prediction.probability > threshold
    ) {
      console.log(`Photo with id ${file.file_id} is NSFW`)
      return true
    }
  }
  console.log(`Photo with id ${file.file_id} is SFW`)
  return false
}

export async function isExplicitGif(file: File) {
  if (!model) {
    return false
  }
  const pic = await axios.get(
    `https://api.telegram.org/file/bot${process.env.TOKEN}/${file.file_path}`,
    {
      responseType: 'arraybuffer',
    }
  )
  console.log(`Got gif with id ${file.file_id}`)
  const buffer = await sharp(pic.data).gif().toBuffer()
  console.log(`Got gif with id ${file.file_id}`)
  const image = await tf.node.decodeImage(buffer, 3)
  const predictions = await model.classifyGif(image)
  console.log(`Predictions for gif with id ${file.file_id}:`, predictions)
  image.dispose()
}
