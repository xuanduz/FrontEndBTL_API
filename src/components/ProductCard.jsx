import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";

import Sale from "./Sale";
import Button from "./Button";
import { getRequiredLazySlides } from "react-slick/lib/utils/innerSliderUtils";

class ProductCard extends Component {
  constructor() {
    super();
  }

  render() {
    const { navigate } = this.props;
    return (
      <div className={"card-container " + this.props.grid}>
        {this.props.discount ? <Sale discount={this.props.discount} /> : null}
        <div className="card">
          <div className="card-image">
            <img src={require("../assets/images/products/" + this.props.img)} />
          </div>
          <div className="card-details">
            <div className="card-details-center">
              <h1>{this.props.name}</h1>
              <div className="card-details-center-price">
                {this.props.discount ? (
                  <>
                    <del>
                      {parseInt(this.props.price)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      ₫
                    </del>
                    <span>
                      {parseInt(
                        this.props.price * (1 - this.props.discount * 0.01)
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      ₫
                    </span>
                  </>
                ) : (
                  <span>
                    {parseInt(this.props.price)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    ₫
                  </span>
                )}
              </div>
              <div className="card-details-center-button">
                <Link to={`/detail/${this.props.path}`}>
                  <Button
                    text="Xem thêm"
                    onClick={() => this.props.handleChangePath}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function (props) {
  const navigate = useNavigate();
  return <ProductCard {...props} navigate={navigate} />;
}
