import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'planet',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Planet = require('./containers/PlanetContainer').default
      const reducer = require('./modules/planet').default

      injectReducer(store, { key: 'planet', reducer })

      cb(null, Planet)

    }, 'planet')
  }
})
