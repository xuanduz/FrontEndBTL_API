import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import _ from "lodash";

import Filter from "../components/Filter";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
      listItemStorage: [],
      listEmpty: false,
      hasMore: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getApi();
  }

  getApi() {
    axios
      .get(process.env.REACT_APP_API + "getProductByStyle/" + this.props.style)
      .then((res) =>
        this.setState({
          listItem: res.data,
          listItemStorage: res.data,
        })
      );
  }

  componentDidUpdate(prevProps) {
    if (this.props.style !== prevProps.style) {
      this.getApi();
    }
  }

  filterBarClicked = () => {
    document
      .querySelector(".filter-responsive-sidebar")
      .classList.toggle("show-filter-responsive");
    document.querySelector(".backdrop-products").classList.toggle("hide");
  };

  handleFilter = (checkedList) => {
    if (
      checkedList[0].category.length === 0 &&
      checkedList[1].color.length === 0 &&
      checkedList[2].size.length === 0
    ) {
      this.setState({
        listItem: this.state.listItemStorage,
      });
    } else {
      var result = [];
      if (checkedList[0].category.length > 0) {
        checkedList[0].category.map((itemCat, index) => {
          result = result.concat(
            this.state.listItemStorage.filter((i) => i.CA_name === itemCat)
          );
        });
      }
      if (checkedList[1].color.length > 0) {
        checkedList[1].color.map((itemCol, index) => {
          if (checkedList[0].category.length === 0) {
            result = result.concat(
              this.state.listItemStorage.filter((i) =>
                i.P_color.some((e) => e.COL_slug === itemCol)
              )
            );
          } else {
            result = result.filter((i) =>
              i.P_color.some((e) => e.COL_slug === itemCol)
            );
          }
        });
      }
      if (checkedList[2].size.length > 0) {
        checkedList[2].size.map((itemSiz, index) => {
          if (checkedList[0].category.length === 0) {
            result = result.concat(
              this.state.listItemStorage.filter((i) =>
                i.P_size.some((e) => e.S_name === itemSiz)
              )
            );
          } else {
            result = result.filter((i) =>
              i.P_size.some((e) => e.S_name === itemSiz)
            );
          }
        });
      }
      result = _.uniqWith(result, _.isEqual);

      this.setState({
        listItem: result,
      });
    }
  };

  render() {
    return (
      <div className="products-container">
        <div
          className="backdrop-products hide"
          onClick={() => this.filterBarClicked()}
        ></div>
        <div className="products row">
          <div className="products-left col-md-3 col-lg-2">
            <Filter
              category={this.props.style}
              handleFilter={(checkedList) => this.handleFilter(checkedList)}
            />
          </div>
          <div className="products-right col-md-9 col-lg-10 col-12">
            <div className="filter-responsive">
              <div className="row">
                <div
                  className="filter-responsive-btn"
                  onClick={() => this.filterBarClicked()}
                >
                  <b>Bộ lọc</b>
                  <i className="bx bx-filter-alt"></i>
                </div>
              </div>
              <div className="filter-responsive-sidebar">
                <Filter
                  category={this.props.style}
                  handleFilter={(data) => this.handleFilter(data)}
                />
              </div>
            </div>
            <div className="row list-products">
              {this.state.listItem &&
                this.state.listItem.length > 0 &&
                this.state.listItem.map((item, index) => (
                  <ProductCard
                    idSP={item.P_id}
                    key={item.P_id}
                    img={item.P_image}
                    name={item.P_name}
                    price={item.P_price}
                    path={item.P_slug}
                    discount={item.P_discount}
                    grid=" col-xl-3 col-md-6 col-12"
                  />
                ))}
              {this.state.listEmpty && <h2>Không có sản phẩm nào</h2>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
