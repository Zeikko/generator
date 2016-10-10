import _ from 'lodash'
import { getFeatureModifier } from '../generate-string'
import { generatePlanetName } from './generate-name'
import { generateAtmosphere } from './generate-atmosphere'
import { generateTerrain } from './generate-terrain'
import { generateSize } from './generate-size'
import { generateTemperature } from './generate-temperature'
import { generateBiosphere } from './generate-biosphere'
import { generatePopulation } from './generate-population'
import { generateTechnology } from './generate-technology'

export function getPlanet(req, res) {
  const planet = {
    name: generatePlanetName()
  }
  generateSize('%size%', _.random(-1, 1)).then(size => {
    planet.size = size
    return generateAtmosphere(size.string, getFeatureModifier(planet, 'atmosphere'))
  })
  .then(atmosphere => {
    planet.atmosphere = atmosphere
    return generateTemperature(atmosphere.string, getFeatureModifier(planet, 'temperature'))
  })
  .then(temperature => {
    planet.temperature = temperature
    return generateTerrain(temperature.string, getFeatureModifier(planet, 'terrain'))
  })
  .then(terrain => {
    planet.terrain = terrain
    return generateBiosphere(terrain.string, getFeatureModifier(planet, 'biosphere'))
  })
  .then(biosphere => {
    planet.biosphere = biosphere
    return generatePopulation(biosphere.string, getFeatureModifier(planet, 'population'))
  })
  .then(population => {
    planet.population = population
    return generateTechnology(population.string, getFeatureModifier(planet, 'technology'))
  })
  .then(technology => {
    planet.technology = technology
    planet.description = fixGrammar(technology.string)
    res.json(planet)
  })
}


function fixGrammar(string) {
  return string.replace(/\b(a) ([eyuioa])/g, 'an $1')
}