import _ from 'lodash'
import { replaceMarked } from '../generate-string'
import { getData } from '../read-spreadsheet'

export function getTerrain(req, res) {
  generateTerrain().then(terrain => {
    res.json({
      terrain
    })
  })
}

export function generateTerrain(string, modifier) {
  return getData('https://docs.google.com/spreadsheets/d/12NUonkE6QHBVlNEuXXQMVLg_33pFsnROQlhsEEFBm8M/pub?gid=0&single=true&output=csv').then(data => {
    return replaceMarked(data, {
      string,
      features: [],
      modifier
    })
  })
}