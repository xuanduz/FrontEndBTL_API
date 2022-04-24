import React, { Component } from 'react'

export default class Button extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <button
        className="button-component"
        onClick={this.props.onClick ? () => (this.props.onClick()) : null}
      >
        {this.props.icon === 'addtocart' && <i className='bx bxs-cart-add'></i>}
        {this.props.icon === 'buynow' && <i className='bx bxs-badge-dollar'></i>}
        <span>
          {this.props.text}
        </span>
        {this.props.icon === 'readmore' && <i className='bx bx-chevron-down'></i>}
        {this.props.icon === 'collapse' && <i className='bx bx-chevron-up'></i>}
      </button>
    )
  }
}
