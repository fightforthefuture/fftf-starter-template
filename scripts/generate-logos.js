const fs = require('fs')
const path = require('path')

async function main() {
  const dir = path.resolve(__dirname, '..', 'static', 'logos')
  const logos = []

  fs.readdirSync(dir).forEach(file => {
    if (file.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
      logos.push({
        name: file.replace(/\.(png|jpg|jpeg|gif|svg)$/i, ''),
        image_url: `/logos/${file}`
      })
    }
  })

  const dataFile = path.resolve(__dirname, '..', 'assets', 'data', 'logos.json')
  fs.writeFileSync(dataFile, JSON.stringify(logos, null, 2))
}

main().catch(console.error)
