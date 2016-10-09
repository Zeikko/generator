import _ from 'lodash'
import { replaceMarked } from '../generate-string'
import { getData } from '../read-spreadsheet'

export function getTemperature(req, res) {
  generateTerrain().then(temperature => {
    res.json({
      temperature
    })
  })
}

export function generateTemperature(modifier) {
  return getData('https://docs.google.com/spreadsheets/d/1YsGusJ-x4HBogC7uCWtGMs6-v3hHqpdQ6cx_Xmig_6A/pub?gid=0&single=true&output=csv').then(data => {
    return replaceMarked(data, {
      string: '%temperature%',
      features: [],
      modifier
    })
  })
}
