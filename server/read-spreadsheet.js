import axios from 'axios'
import parse from 'csv-parse/lib/sync'
import _ from 'lodash'

let data = {}

function readSpreadsheet(url) {
  return axios.get(url)
    .then(function (response) {
      return parse(response.data, {
        columns: true
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function getData() {
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