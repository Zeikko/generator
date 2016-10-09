import { connect } from 'react-redux'
import { actions } from '../modules/planet'

import Planet from '../components/Planet'

const mapDispatchToProps = actions

const mapStateToProps = (state) => ({
  planet: state.planet
})


export default connect(mapStateToProps, mapDispatchToProps)(Planet)
