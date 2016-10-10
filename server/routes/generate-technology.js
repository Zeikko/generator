import _ from 'lodash'
import { replaceMarked } from '../generate-string'
import { getData } from '../read-spreadsheet'

export function getTechnology(req, res) {
  generateTerrain().then(technology => {
    res.json({
      technology
    })
  })
}

export function generateTechnology(string, modifier) {
  return getData('https://docs.google.com/spreadsheets/d/1CFfUdfz_LjNr0QjPAxBhFzKM8OyA3oIxBf5V8X4TmfI/pub?gid=0&single=true&output=csv').then(data => {
    return replaceMarked(data, {
      string: string,
      features: [],
      modifier
    })
  })
}