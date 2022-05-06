import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import logo from "../assets/images/Logo-2.png";

class Header extends Component {
  constructor() {
    super();
    this.headerRef = React.createRef();
    this.state = {
      listProduct: [],
      totalAmount: null,
      mainNav: [
        {
          display: "Trang chủ",
          path: "/",
        },
        {
          display: "Vị trí",
          path: "/contact",
        },
      ],
    };
  }

  async componentDidMount() {
    const res = await axios.get(process.env.REACT_APP_API + "getStyle");
    this.setState({
      listProduct: await this.props.dataRedux,
      mainNav: [
        ...this.state.mainNav,
        ...res.data.map((item, index) => {
          return {
            display: item.stName,
            path: "/products/" + item.stSlug,
          };
        }),
      ],
    });
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 70 ||
        document.documentElement.scrollTop > 70
      ) {
        this.headerRef.current.classList.add("shrink");
      } else {
        this.headerRef.current.classList.remove("shrink");
      }
    });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.dataRedux !== prevProps.dataRedux) {
      const res = await axios.get(process.env.REACT_APP_API + "getStyle");
      this.setState({
        ...this.state,
        listProduct: await this.props.dataRedux,
      });
    }
  }

  async callApiCategory() {
    const res = await axios.get(process.env.REACT_APP_API + "getStyle");
    this.setState({
      mainNav: [
        ...this.state.mainNav,
        ...res.data.map((item, index) => {
          return {
            display: item.stName,
            path: "/products/" + item.stSlug,
          };
        }),
      ],
    });
  }

  handleBtnMenu() {
    document.querySelector("#nav-icon3").classList.toggle("open");

    document
      .querySelector(".header-container-sidebar")
      .classList.toggle("show-sidebar");
  }

  handleLogout = () => {
    localStorage.setItem("ACCOUNT", null);
    window.location.href = "/";
  };

  render() {
    // const totalAmount = [];
    const totalAmount = this.state.listProduct.reduce(
      (total, item) => total + item.cdAmount,
      0
    );
    const checkAccount = JSON.parse(localStorage.getItem("ACCOUNT"));
    return (
      <div className="header-container" ref={this.headerRef}>
        <div className="header">
          <div className="header-logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="header-nav-items">
            <ul className="header-nav-items-list">
              {this.state.mainNav.map((item, index) => (
                <Link to={item.path} key={index}>
                  <li>{item.display}</li>
                </Link>
              ))}
            </ul>
            {checkAccount !== null ? (
              <div className="header-nav-items header-nav-items-bag">
                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <div
                    className={
                      totalAmount > 0
                        ? "total-amount total-amount-small"
                        : "hide"
                    }
                  >
                    {totalAmount}
                  </div>
                </Link>
              </div>
            ) : null}
            <div className="header-nav-items header-nav-items-account">
              <i className="bx bx-user-circle"></i>
              <ul className="header-nav-items-account-items">
                {checkAccount == null ? (
                  <div>
                    <li>
                      <Link to="/login">
                        <i className="bx bxs-log-in-circle"></i>
                        <span>Login</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/register">
                        <i className="bx bxs-user-plus"></i>
                        <span>Register</span>
                      </Link>
                    </li>
                  </div>
                ) : (
                  <li>
                    <h6>Hello, {checkAccount}</h6>
                    <div className="logout-btn" onClick={this.handleLogout}>
                      <i className="bx bxs-log-out-circle"></i>
                      <span>Log Out</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="header-menu ">
            <div id="nav-icon3" onClick={() => this.handleBtnMenu()}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="header-container-sidebar">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <ul>
            {this.state.mainNav.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                onClick={() => this.handleBtnMenu()}
              >
                <li>{item.display}</li>
              </Link>
            ))}
            <div className="header-nav-items header-nav-items-account">
              <i className="bx bx-user-circle"></i>
              <ul className="header-nav-items-account-items">
                {checkAccount == null ? (
                  <div>
                    <li>
                      <Link to="/login">
                        <i className="bx bxs-log-in-circle"></i>
                        <span>Login</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/register">
                        <i className="bx bxs-user-plus"></i>
                        <span>Register</span>
                      </Link>
                    </li>
                  </div>
                ) : (
                  <li>
                    <h6>Hello, {checkAccount}</h6>
                    <div className="logout-btn" onClick={this.handleLogout}>
                      <i className="bx bxs-log-out-circle"></i>
                      <span>Log Out</span>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <Link to="/cart" onClick={() => this.handleBtnMenu()}>
              <i className="fas fa-shopping-bag"></i>
              <div
                className={
                  totalAmount > 0 ? "total-amount total-amount-small" : "hide"
                }
              >
                {totalAmount}
              </div>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataRedux: state,
  };
};

export default connect(mapStateToProps)(Header);
