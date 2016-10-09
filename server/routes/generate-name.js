import { planetNames } from '../data/planet-names.js'
import _ from 'lodash'

export function getName(req, res) {
  res.json({
    string: generatePlanetName()
  })
}

export function generatePlanetName() {
  return planetNames[_.random(0,planetNames.length - 1)]
}
