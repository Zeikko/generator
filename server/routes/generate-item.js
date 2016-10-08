import _ from 'lodash'
import { getData } from '../read-spreadsheet'

let data

export function generateItem(req, res) {
  data = getData()
  res.json(replace({
    name: 'phrase'
  }))
}

function replace(obj) {
  const newObj = _.clone(obj)
  newObj.name = _.map(obj.name.split(' '), namePart => {
    if(_.get(data, namePart + '.children')) {
      const match = _.chain(data[namePart].children)
        .shuffle()
        .first()
        .value()
      namePart = _.get(match, 'name', match) //Can be removed when data includes only objects
    }
    return namePart
  }).join(' ')
  if(newObj.name === obj.name) {
    return newObj
  } else {
    return replace(newObj)
  }
}