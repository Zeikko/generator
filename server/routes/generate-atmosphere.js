import _ from 'lodash'
import { replaceMarked } from '../generate-string'
import { getData } from '../read-spreadsheet'

export function getAtmosphere(req, res) {
  generateTerrain().then(atmosphere => {
    res.json({
      atmosphere
    })
  })
}

export function generateAtmosphere(string, modifier) {
  return getData('https://docs.google.com/spreadsheets/d/1U1_o5YzDhTikyPYtQn-Kg9as9FTZoN5_yJOrEGuaNeU/pub?gid=0&single=true&output=csv').then(data => {
    return replaceMarked(data, {
      string,
      features: [],
      modifier
    })
  })
}