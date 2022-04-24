import React, { Component } from "react";

export default class Sale extends Component {
  render() {
    return <div className="sale-tag">{this.props.discount}%</div>;
  }
}
