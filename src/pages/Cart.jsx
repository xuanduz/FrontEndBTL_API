import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import Button from "../components/Button";

class Cart extends Component {
  constructor() {
    super();
    this.amountRef = React.createRef([]);
    this.setWrapperRef = React.createRef();
    this.state = {
      test: [],
      render: false,
      cartItems: [],
      clickOutside: false,
      amountInput: 1,
      item: {
        index: null,
        value: null,
      },
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      test: await this.props.dataRedux,
    });
    this.getAPI();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.dataRedux !== prevProps.dataRedux) {
      console.log("did mount");
      this.setState({
        test: await this.props.dataRedux,
      });
    }
    // this.setState({
    //   test: await this.props.dataRedux,
    // });
    // console.log("update cart ", await this.props.dataRedux);
    // this.setState({
    //   cartItems: JSON.parse(localStorage.getItem("CART-ITEMS")),
    // });
    // if(this.state.)
    // if (this.props.dataRedux !== prevProps.dataRedux) {
    // this.getAPI();
    // }
  }

  getAPI() {
    var username =
      JSON.parse(localStorage.getItem("ACCOUNT")) !== null
        ? JSON.parse(localStorage.getItem("ACCOUNT"))
        : null;
    if (username !== null) {
      axios
        .get(process.env.REACT_APP_API + "getCartByUser/" + username)
        .then((res) => {
          this.setState({
            cartItems:
              res && res.data[0] && res.data[0].CartDetail
                ? res.data[0].CartDetail
                : [],
          });
        });
    }
  }

  handleChangeAmount = (e, item) => {
    // var value = null;
    // if (e.target.value === "") {
    //   value = "";
    // } else if (!isNaN(e.target.value)) {
    //   value: parseInt(e.target.value);
    // }
    const temp = {
      CD_PID: item.CD_PID,
      P_slug: item.P_slug,
      P_image: item.P_image,
      P_name: item.P_name,
      P_price: item.P_price,
      P_discount: item.P_discount,
      CD_COLslug: item.CD_COLslug,
      CD_S_name: item.CD_S_name,
      CD_amount: e.target.value,
    };
    console.log(temp);
    this.getAPI();
    this.props.handleOnChange(temp);
  };

  handleKeyPress = (e) => {
    if (e.charCode === 43 || e.charCode === 45) {
      e.preventDefault();
    }
  };

  getItemFromStore = async () => {
    return await this.props.dataRedux;
  };

  render() {
    let totalPrice = this.state.cartItems.reduce(
      (total, item) =>
        total + item.CD_amount * (item.P_price * (1 - item.P_discount * 0.01)),
      0
    );
    return (
      <div className="cart-container">
        {/* {console.log("check dataFromRedux ", this.props.dataRedux)} */}
        {console.log("test ", this.state.test)}
        <div className="cart row">
          <div className="cart-main col-12">
            <div className="cart-main-header row">
              <div className="col-6 ">Sản phẩm</div>
              <div className="col-2">Đơn giá</div>
              <div className="col-2">Số lượng</div>
              <div className="col-2">Số tiền</div>
            </div>
            {this.state.test &&
              this.state.test.length > 0 &&
              this.state.test.map((item, index) => {
                return (
                  <div className="cart-main-content row" key={index}>
                    <div className="cart-main-content-col1 row col-6 ">
                      <div className="cart-main-content-col1-img col-3">
                        <img
                          src={require(`../assets/images/products/${item.P_image}`)}
                          alt=""
                        />
                      </div>
                      <div className="cart-main-content-col1-text col-8">
                        <div>
                          <Link to={`/detail/${item.P_slug}`}>
                            <div className="title">
                              <span style={{ textTransform: "uppercase" }}>
                                {item.P_name}
                              </span>
                            </div>
                          </Link>
                          <div className="type">
                            <span>
                              {item.CD_COLslug} / {item.CD_S_name}
                            </span>
                          </div>
                        </div>
                        <div
                          className="delete"
                          onClick={() => this.props.handleDelete(item)}
                        >
                          <i className="bx bx-trash"></i>
                          <span>Xóa</span>
                        </div>
                      </div>
                    </div>
                    <div className="cart-price-per-item col-2">
                      <div>
                        {(
                          parseInt(item.P_price) *
                          (1 - parseFloat(item.P_discount) * 0.01)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        ₫
                      </div>
                    </div>
                    <div className="cart-amount col-2">
                      <div className="product-view-detail-amount-btn">
                        <button
                          className="amount-decrease"
                          onClick={() => {
                            this.setState({ render: !this.state.render });
                            this.props.handleDecreaseBtn(item);
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          id={`amountInput` + index.toString()}
                          className="amount-input"
                          value={item.CD_amount}
                          onChange={(e) => this.handleChangeAmount(e, item)}
                          ref={this.amountRef[index]}
                          onKeyPress={this.handleKeyPress}
                        />
                        <button
                          className="amount-increase"
                          onClick={() => this.props.handleIncreaseBtn(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-total-price col-2">
                      <div>
                        {item.CD_amount === ""
                          ? (parseInt(item.P_price) * 0)
                              .toString()
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                          : (
                              parseInt(item.P_price) *
                              (1 - parseFloat(item.P_discount) * 0.01) *
                              item.CD_amount
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        ₫
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {this.state.cartItems && this.state.cartItems.length > 0 && (
            <div className="cart-footer-container row">
              <div className="cart-footer row">
                <div className="cart-footer-left col-lg-6 col-12">
                  <div className="cart-footer-left-icon">
                    <i className="bx bxs-truck"></i>
                  </div>
                  <div
                    className={
                      `car-footer-left-freeship` +
                      (totalPrice >= 200000 ? `` : ` hide`)
                    }
                  >
                    <h4>Miễn phí giao hàng</h4>
                  </div>
                  <div
                    className={
                      `car-footer-left-charges` +
                      (totalPrice < 200000 ? `` : ` hide`)
                    }
                  >
                    <h4>
                      Phí giao hàng <span>30.000₫</span>
                    </h4>
                    <p>
                      Mua trên <span>200.000₫</span> sẽ được{" "}
                      <span>Freeship</span>
                    </p>
                  </div>
                </div>
                <div className="cart-footer-right col-lg-6 col-12">
                  <div className="cart-footer-right-total-price">
                    <b>Tổng cộng</b>
                    <span>
                      {(totalPrice < 200000 ? totalPrice + 30000 : totalPrice)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      ₫
                    </span>
                  </div>
                  <div className="cart-footer-right-btn">
                    <div className="cart-footer-right-total-amount"></div>
                    <Button text={"Thanh toán"} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (listItemInCart) => {
  return {
    dataRedux: listItemInCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDecreaseBtn: (item) => dispatch({ type: "DECREASE", payload: item }),
    handleIncreaseBtn: (item) => dispatch({ type: "INCREASE", payload: item }),
    handleOnChange: (obj) => dispatch({ type: "ON_CHANGE", payload: obj }),
    handleDelete: (item) => dispatch({ type: "ON_DELETE", payload: item }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
