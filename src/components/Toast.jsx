import React, { Component } from 'react'

export default class Toast extends Component {
  handleCloseToast = () => {
    document.querySelector('.toast-container').classList.remove('toast-active')
  }
  render() {
    return (
      <div className={`toast-container ${this.props.text !== '' ? 'toast-active' : ''}`}>
        <div className="toast">
          <div className="toast-text">
            {this.props.text}
          </div>
          <div className="toast-close" onClick={() => this.handleCloseToast()}>
            <i className="bx bx-x"></i>
          </div>
        </div>
      </div>
    )
  }
}
