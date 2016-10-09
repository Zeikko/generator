import _ from 'lodash'
import { getFeatureModifier } from '../generate-string'
import { generatePlanetName } from './generate-name'
import { generateAtmosphere } from './generate-atmosphere'
import { generateTerrain } from './generate-terrain'
import { generateSize } from './generate-size'
import { generateTemperature } from './generate-temperature'
import { generateBiosphere } from './generate-biosphere'

export function getPlanet(req, res) {
  const planet = {
    name: generatePlanetName()
  }
  generateSize(_.random(-1, 1)).then(size => {
    planet.size = size
    return generateAtmosphere(getFeatureModifier(planet, 'atmosphere'))
  })
  .then(atmosphere => {
    planet.atmosphere = atmosphere
    return generateTemperature(getFeatureModifier(planet, 'temperature'))
  })
  .then(temperature => {
    planet.temperature = temperature
    return generateTerrain(getFeatureModifier(planet, 'terrain'))
  })
  .then(terrain => {
    planet.terrain = terrain
    return generateBiosphere(getFeatureModifier(planet, 'biosphere'))
  })
  .then(biosphere => {
    planet.biosphere = biosphere
    planet.description = combineDescriptions(planet)
    res.json(planet)
  })
}


function combineDescriptions(planet) {
  const attributes = _.chain(planet)
    .mapValues(attribute => _.get(attribute, 'string', null))
    .filter(attribute => attribute)
    .map(string => string.replace(/\b(a) ([eyuioa])/g, 'an $1'))
    .value()
  return attributes.join(' ')
}