import React, { Component } from "react";
import axios from "axios";

import Policy from "../components/Policy";

import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      saleProduct: [],
      randomProduct: [],
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    let response1 = await axios.get(
      process.env.REACT_APP_API + "topSaleProduct/4"
    );
    this.setState({
      saleProduct: response1 && response1.data ? response1.data : [],
    });

    let response2 = await axios.get(
      process.env.REACT_APP_API + "randomProduct/8"
    );
    this.setState({
      randomProduct: response2 && response2.data ? response2.data : [],
    });
  }

  render() {
    return (
      <div className="home">
        <Carousel />
        <Policy />
        <section className="section-sale-product">
          <h2 className="section-title">SALE UPTO 66%</h2>
          <div className="section-sale-product-banner">
            <img
              src={require("../assets/images/banner_hangngay_1.jpg")}
              alt=""
            />
          </div>
          <div className="section-sale-product-card row">
            {this.state.saleProduct.map((item, index) => (
              <ProductCard
                idSP={item.pId}
                key={item.pId}
                img={item.pImage}
                name={item.pName}
                price={item.pPrice}
                path={item.pSlug}
                discount={item.pDiscount}
                grid=" col-xl-3 col-md-6 col-12"
              />
            ))}
          </div>
        </section>

        <section className="section-new-product section-sale-product">
          <h2 className="section-title">Sản phẩm mới</h2>
          <div className="section-new-product-banner section-sale-product-banner">
            <img src={require("../assets/images/banner_2.jpg")} alt="" />
          </div>
          <div className="section-new-product-card section-sale-product-card row">
            {this.state.randomProduct.map((item, index) => (
              <ProductCard
                idSP={item.pId}
                key={item.pId}
                img={item.pImage}
                name={item.pName}
                price={item.pPrice}
                path={item.pSlug}
                discount={item.pDiscount}
                grid=" col-xl-3 col-md-6 col-12"
              />
            ))}
            {/* {productData.getProducts(8).map((item, index) => (
              <ProductCard
                idSP={item.P_id}
                key={item.P_id}
                img={item.P_image}
                name={item.P_name}
                price={item.P_Price}
                path={item.P_slug}
                discount={item.P_discount}
                grid=" col-xl-3 col-md-6 col-12"
              />
            ))} */}
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
