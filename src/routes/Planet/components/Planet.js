import React from 'react'
import './Planet.scss'

class Planet extends React.Component { 

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-2">
          <button className="btn btn-primary generate-button" onClick={this.props.generatePlanet}>Generate Planet</button>
          </div>
        </div>
        <h2 className="name">{this.props.planet.result.name}</h2>
        <p className="description">{this.props.planet.result.description}</p>
      </div>
    )
  }
}

Planet.propTypes = {
  planet: React.PropTypes.object.isRequired,
  generatePlanet: React.PropTypes.func.isRequired,
}

export default Planet
