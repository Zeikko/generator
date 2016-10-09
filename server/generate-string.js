import _ from 'lodash'

export function replace(data, obj) {
  const newObj = _.clone(obj)
  newObj.string = _.map(obj.string.split(' '), stringPart => {
    if(_.get(data, stringPart + '.children')) {
      const match = _.chain(data[stringPart].children)
        .shuffle()
        .first()
        .value()
      stringPart = _.get(match, 'string', match) //Can be removed when data includes only objects
    }
    return stringPart
  }).join(' ')
  if(newObj.string === obj.string) {
    return newObj
  } else {
    return replace(data, newObj)
  }
}

export function replaceMarked(data, obj) {
  const newObj = _.clone(obj)
  const random = _.random(-1,1)
  newObj.string = obj.string.replace(/%(.*?)%/g, stringPart => {
    stringPart = stringPart.replace(/%/g, '')
    if(_.get(data, stringPart)) {
      
      const match = _.chain(data[stringPart])
        .map(row => {
          row.distance = 0
          row.random = random
          row.modifier = obj.modifier
          if(row.level) {
            row.distance = Math.abs(row.level - (3 + random + obj.modifier))
          }
          return row
        })
        .shuffle()
        .orderBy(['distance'], ['asc'])
        .first()
        .value()
      stringPart = _.get(match, 'string', match)
      newObj.features.push(match)
    }
    return stringPart
  })
  if(newObj.string === obj.string) {
    return newObj
  } else {
    return replaceMarked(data, newObj)
  }
}

export function getFeatureModifier(obj, modifiedFeature) {
  return _.chain(obj)
    .map(attribute => {
      return _.get(attribute, 'features', [])
    })
    .flatten()
    .map(feature => {
      const modifier = _.get(feature, modifiedFeature, 0)
      return modifier === null ? 0 : parseInt(modifier)
    })
    .sum()
    .value()
}