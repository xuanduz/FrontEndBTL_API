import React, { Component } from "react";
import _ from "lodash";

import Button from "./Button";

import Checkbox from "./Checkbox";
import axios from "axios";
import RenderCategory from "./RenderCategory";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList: [],
      colorList: [],
      sizeList: [],

      categoryChecked: [],
      colorChecked: [],
      sizeChecked: [],
    };
  }

  componentDidMount() {
    this.getApi();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.getApi();
      this.setState({
        categoryChecked: [],
        colorChecked: [],
        sizeChecked: [],
      });
    }
  }

  async getApi() {
    const resCategory = await axios.get(
      process.env.REACT_APP_API + "getCatalog/" + this.props.category
    );
    const resColor = await axios.get(
      process.env.REACT_APP_API + "getColor/" + this.props.category
    );
    const resSize = await axios.get(
      process.env.REACT_APP_API + "getSize/" + this.props.category
    );

    this.setState({
      categoryList: resCategory && resCategory.data ? resCategory.data : null,
      colorList: resColor && resColor.data ? resColor.data : null,
      sizeList: resSize && resSize.data ? resSize.data : null,
    });
  }

  handleCheckbox = (type, check, item) => {
    if (check.checked === true) {
      switch (type) {
        case "category":
          this.setState({
            categoryChecked: [...this.state.categoryChecked, item.CA_name],
          });
          break;
        case "color":
          this.setState({
            colorChecked: [...this.state.colorChecked, item.COL_slug],
          });
          break;
        case "size":
          this.setState({
            sizeChecked: [...this.state.sizeChecked, item.S_name],
          });
          break;
        default:
      }
    } else if (check.checked === false) {
      switch (type) {
        case "category":
          const newCategoryChecked = this.state.categoryChecked.filter(
            (i) => i !== item.CA_name
          );
          this.setState({
            categoryChecked: newCategoryChecked,
          });
          break;
        case "color":
          const newColorChecked = this.state.colorChecked.filter(
            (i) => i !== item.COL_slug
          );
          this.setState({
            colorChecked: newColorChecked,
          });
          break;
        case "size":
          const newSizeChecked = this.state.sizeChecked.filter(
            (i) => i !== item.S_name
          );
          this.setState({
            sizeChecked: newSizeChecked,
          });
          break;
        default:
      }
    }
  };

  handleFilter = () => {
    var checkedList = [
      { category: this.state.categoryChecked },
      { color: this.state.colorChecked },
      { size: this.state.sizeChecked },
    ];
    this.props.handleFilter(checkedList);
  };

  clearFilter = () => {
    var checkedList = [{ category: [] }, { color: [] }, { size: [] }];
    this.setState({
      categoryChecked: [],
      colorChecked: [],
      sizeChecked: [],
    });
    this.props.handleFilter(checkedList);
  };

  render() {
    return (
      <div className="filter">
        <div className="filter-category">
          <h3>Danh Mục Sản Phẩm</h3>
          {this.state.categoryList &&
            this.state.categoryList.map((item, index) => (
              <Checkbox
                key={index}
                display={item.CA_name}
                item={item}
                checked={this.state.categoryChecked.includes(item.CA_name)}
                onChange={(check, item) =>
                  this.handleCheckbox("category", check, item)
                }
              />
            ))}
        </div>
        <div className="filter-color">
          <h3>Màu Sắc</h3>
          {this.state.colorList &&
            this.state.colorList.map((item, index) => (
              <Checkbox
                key={index}
                display={item.COL_name}
                item={item}
                checked={this.state.colorChecked.includes(item.COL_slug)}
                onChange={(check, item) =>
                  this.handleCheckbox("color", check, item)
                }
              />
            ))}
        </div>
        <div className="filter-size">
          <h3>Kích Cỡ</h3>
          {this.state.sizeList &&
            this.state.sizeList.map((item, index) => (
              <Checkbox
                key={index}
                display={item.S_name}
                item={item}
                checked={this.state.sizeChecked.includes(item.S_name)}
                onChange={(check, item) =>
                  this.handleCheckbox("size", check, item)
                }
              />
            ))}
        </div>
        <div className="filter-submit">
          <Button text="Lọc" onClick={() => this.handleFilter()} />
          <Button text="Xóa bộ lọc" onClick={() => this.clearFilter()} />
        </div>
      </div>
    );
  }
}

export default Filter;
