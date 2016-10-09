import _ from 'lodash'
import { readSpreadsheet } from '../read-spreadsheet'
import { replace } from '../generate-string'

let data = {}

function getData() {
  return data
} 

function update() {
  readSpreadsheet('https://docs.google.com/spreadsheets/d/1U4X7xTTVl0JfF0pwFlxdtuQB5oj90n9VZNOc_lAU4JI/pub?gid=0&single=true&output=csv').then(csv => {
    data = _.chain(csv)
      .groupBy('name')
      .mapValues(arr => _.first(arr))
      .mapValues(item => {
        item.children = item.children.length ? item.children.split(',') : null
        return item
      })
      .value()
  })
}

update()

setInterval(update, 60 * 1000)

export function getItem(req, res) {
  data = getData()
  res.json(replace(data, {
    string: 'phrase'
  }))
}