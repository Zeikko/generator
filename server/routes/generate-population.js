import _ from 'lodash'
import { replaceMarked } from '../generate-string'
import { getData } from '../read-spreadsheet'

export function getPopulation(req, res) {
  generateTerrain().then(population => {
    res.json({
      population
    })
  })
}

export function generatePopulation(string, modifier) {
  return getData('https://docs.google.com/spreadsheets/d/1H2LtEgoA_YLhQYjJGfekuN217oit76ufPbq8cwGymX0/pub?gid=0&single=true&output=csv').then(data => {
    return replaceMarked(data, {
      string,
      features: [],
      modifier
    })
  })
}