import React from 'react'
import './Item.scss'

class Item extends React.Component { 

  componentDidMount() {
    this.props.getItemTypes()
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-2">
          <button className="btn btn-primary generate-item-button" onClick={this.props.generateItem}>Generate Item</button>
          </div>
        </div>
        <h2 className="name">{this.props.item.result.name}</h2>
      </div>
    )
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
  generateItem: React.PropTypes.func.isRequired,
  getItemTypes: React.PropTypes.func.isRequired,
  setItemType: React.PropTypes.func.isRequired,
  setEnchantmentCount: React.PropTypes.func.isRequired
}

export default Item
