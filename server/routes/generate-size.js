import _ from 'lodash'
import { replaceMarked } from '../generate-string'
import { getData } from '../read-spreadsheet'

export function getSize(req, res) {
  generateTerrain().then(size => {
    res.json({
      size
    })
  })
}

export function generateSize(string, modifier) {
  return getData('https://docs.google.com/spreadsheets/d/1BiYtAIP7jJAv-SghwAziSKPYacGY7iCx0Srrwm4tViQ/pub?gid=0&single=true&output=csv').then(data => {
    return replaceMarked(data, {
      string,
      features: [],
      modifier
    })
  })
}
