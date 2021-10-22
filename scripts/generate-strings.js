const Airtable = require('airtable')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const showdown = require('showdown')
const showdownTargetBlank = require('showdown-target-blank')
const md = new showdown.Converter({ extensions: [showdownTargetBlank] })
const { kebabCase, sortBy } = require('lodash')
// const formatDate = require('date-fns/format')

require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const BASE_ID = '__AIRTABLE_BASE_ID__'

function formatText(text='') {
  let html = md.makeHtml(text.trim())

  // remove enclosing <p> tag from single line strings
  if ((html.match(/\<p\>/g) || []).length === 1) {
    html = html.replace(/^<p>/, '').replace(/<\/p>$/, '')
  }

  return html
}

function stripMarkdownArtifacts(text='') {
  return text.trim().replace(/^</, '').replace(/>$/, '').replace(/\\_/g, '_')
}

function fetchCopy(lang='en') {
  return new Promise((resolve, reject) => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(BASE_ID)
    const strings = {}

    base('CMS').select({
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      records.filter(r => r.fields.ID).forEach(rec => {
        let { ID, Text, Attachments } = rec.fields
        const isPlainText = rec.fields['Plain text?']

        if (lang === 'es') {
          Text = rec.fields['Spanish Text']

          // skip empty spanish strings so they'll default to english
          if (!Text) {
            return
          }
        }

        if (ID.match(/_image$/)) {
          strings[ID] = Attachments ? Attachments[0].url : null
        }
        else if (ID.match(/_images$/)) {
          strings[ID] = (Attachments || []).map(a => a.thumbnails)
        }
        else if (isPlainText) {
          strings[ID] = stripMarkdownArtifacts(Text)
        }
        else if (Text && Text.trim() !== '') {
          strings[ID] = formatText(Text)
        }
      })
      fetchNextPage()
    }, function done(err) {
       if (err) {
         return reject(err)
       }

       resolve(strings)
    })
  })
}

function fetchTable(table, requiredFields=[], formatFunction=null, sortFields=null) {
  return new Promise((resolve, reject) => {
    const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(BASE_ID)
    let allRecords = []

    base(table).select({
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      const validRecords = records.filter(record => {
        for (let req of requiredFields) {
          if (!record.fields[req]) {
            return false
          }
        }
        return true
      })
      allRecords = allRecords.concat(validRecords)
      fetchNextPage()
    }, function done(err) {
      if (err) {
        return reject(err)
      }

      if (formatFunction) {
        allRecords = allRecords.map(formatFunction)
      }

      if (sortFields) {
        allRecords = sortBy(allRecords, sortFields)
      }

      resolve(allRecords)
    })
  })
}

async function main() {
  const copy = await fetchCopy()

  // const supporters = await fetchTable('Supporters', ['Name'], ({ fields }) => {
  //   return {
  //     name: fields.Name,
  //     logo: fields.Logo ? fields.Logo[0].thumbnails.large.url : null
  //   }
  // }, ['name'])

  const strings = {
    ...copy,
    // supporters
  }

  const i18n = {
    en: {
      cms: strings
    },
  }

  console.log(i18n)

  // this could be JSON, but since everything else is YAML, we'll stick with that for now
  const outputFile = path.resolve(__dirname, '..', 'locales', 'cms.yml')
  fs.writeFileSync(outputFile, yaml.dump(i18n))
}

main().catch(console.error)
