import React, { Component } from "react";

export default class Checkbox extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }
  handleCheckbox = () => {
    this.props.onChange(this.myRef.current, this.props.item);
  };

  render() {
    return (
      <div className="filter-item">
        <label className="filter-item-container">
          {this.props.display}
          <input
            type="checkbox"
            ref={this.myRef}
            checked={this.props.checked}
            onChange={() => this.handleCheckbox()}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    );
  }
}
