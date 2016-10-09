import _ from 'lodash'
import { replaceMarked } from '../generate-string'
import { getData } from '../read-spreadsheet'

export function getBiosphere(req, res) {
  generateTerrain().then(biosphere => {
    res.json({
      biosphere
    })
  })
}

export function generateBiosphere(modifier) {
  return getData('https://docs.google.com/spreadsheets/d/1Dx9FNFjTlr--zjInY17RPx-BiC0kRIps8IgrzO9xsmE/pub?gid=0&single=true&output=csv').then(data => {
    return replaceMarked(data, {
      string: '%biosphere%',
      features: [],
      modifier
    })
  })
}