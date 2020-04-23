const fs = require('fs')
const path = require('path')

// To run:
// Add: `"pregenerate": "npm run generate-routes"` to `scripts` in `package.json`

async function main() {
  const routes = []

  fs.writeFileSync(path.resolve(__dirname, '..', 'assets', 'data', 'routes.json'), JSON.stringify(routes, null, 2))
}

main().catch(console.error)
