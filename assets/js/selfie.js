// import EXIF from 'exif-js'
import canvasTxt from '~/node_modules/canvas-txt/src/index.js'
// import { getMobileOperatingSystem } from '~/assets/js/helpers.js'

function rotateImage(image, degrees) {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const context = canvas.getContext('2d')

  context.save()
  context.translate(canvas.width/2, canvas.height/2)
  context.rotate(degrees*Math.PI/180)
  context.drawImage(image, -image.width/2, -image.height/2)

  context.restore()

  return canvas
}

function getRotationDegrees(orientation) {
  // https://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/
  switch (orientation) {
    case 3:
    case 4:
      return 180
    case 5:
    case 6: // I see this one a lot on my iPhone X / iOS 12
      return 90
    case 7:
    case 8:
      return -90
    default:
      return 0
  }
}

function createImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        return resolve(img)

        // TODO: test on Android / old iOS versions and put this back if necessary
        //
        // EXIF.getData(img, () => {
        //   const exifData = EXIF.getAllTags(img)
        //   const degrees = getRotationDegrees(exifData.Orientation)

        //   if (degrees) {
        //     const rotatedImage = rotateImage(img, degrees)
        //     return resolve(rotatedImage)
        //   }

        //   resolve(img)
        // })
      }

      img.onerror = (error) => {
        console.error(error)
        reject(`Failed to load image: ${event.target.result}`)
      }

      img.src = event.target.result
    }

    reader.onerror = (error) => {
      console.error(error)
      reject(`Failed to read file: ${file}`)
    }

    reader.readAsDataURL(file)
  })
}

export async function createSourcePNG({ sourceElement, sourceFile, width=640, height=640 }) {
  let sourceWidth, sourceHeight

  if (sourceFile) {
    sourceElement = await createImageFromFile(sourceFile)
  }

  if (sourceElement.videoWidth !== undefined) {
    sourceWidth = sourceElement.videoWidth
    sourceHeight = sourceElement.videoHeight
  } else {
    sourceWidth = sourceElement.width
    sourceHeight = sourceElement.height
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')

  if (sourceWidth === sourceHeight) {
    context.drawImage(sourceElement, 0, 0, width, height)
  } else {
    const minVal = Math.min(sourceWidth, sourceHeight)

    if (sourceWidth > sourceHeight) {
      context.drawImage(sourceElement, (sourceWidth - minVal) / 2, 0, minVal, minVal, 0, 0, width, height)
    } else {
      context.drawImage(sourceElement, 0, (sourceHeight - minVal) / 2, minVal, minVal, 0, 0, width, height)
    }
  }

  return canvas.toDataURL('image/png')
}

export async function createCombinedPNG({ sourcePNG, overlayElement, width=640, height=640, comment=null }) {
  // do our best to center the comment
  const bestGuessOfCharsPerLine = 72
  const lineCount = Math.ceil(comment.length / bestGuessOfCharsPerLine)
  const fontSize = 32
  const fontFamily = 'mongoose'
  const paddingTop = 20
  const paddingBottom = 40
  const overlayLogoOffset = 30
  const paddingX = 20

  // create canvas
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')

  // add source image
  const sourceElement = document.createElement('img')
  sourceElement.src = sourcePNG
  context.drawImage(sourceElement, 0, 0, width, height)

  // draw yellow box
  context.fillStyle = "#ffce00"
  const boxHeight = (fontSize * lineCount) + paddingTop + paddingBottom
  context.fillRect(0, canvas.height - boxHeight, canvas.width, boxHeight)

  // draw comment
  context.font = `${fontSize}px ${fontFamily}`
  context.fillStyle = "black"
  canvasTxt.fontSize = fontSize
  canvasTxt.fontStyle = fontFamily
  canvasTxt.lineHeight = fontSize
  canvasTxt.vAlign = 'middle'
  canvasTxt.drawText(context, comment, paddingX, canvas.height - boxHeight - 5, canvas.width - (paddingX * 2), boxHeight - overlayLogoOffset)

  // add june2020.org overlay
  if (overlayElement) {
    context.drawImage(overlayElement, 0, 0, width, height)
  }

  return canvas.toDataURL('image/png')
}
