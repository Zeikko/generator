import axios from 'axios'
import parse from 'csv-parse/lib/sync'
import _ from 'lodash'

let datas = {}

export function readSpreadsheet(url) {
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

export function getData(url) {
  if(_.get(datas, url)) {
    return Promise.resolve(datas[url])
  } else {
    return updateOne(url)
  }
} 

function updateAll() {
  _.forEach(datas, (data, url) => updateOne(url))
}

function updateOne(url) {
  return readSpreadsheet(url).then(csv => {
    const data = _.chain(csv)
      .map(row => {
        return _.mapValues(row, cell => cell.length === 0 ? null : cell)
      })
      .groupBy('parent')
      .value()
      datas[url] = data
    return data
  })
}

setInterval(updateAll, 60 * 1000)