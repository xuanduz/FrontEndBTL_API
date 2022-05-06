import { useNavigate } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Button from "../components/Button";
import ProductCard from "../components/ProductCard";

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.description = React.createRef();
    this.readMoreBtn = React.createRef();
    this.collapseBtn = React.createRef();
    this.inputAmount = React.createRef();
    this.state = {
      productDetail: {},
      randomProduct: [],
      imageDetail: null,
      amount: 1,
      size: null,
      color: null,
      navigateState: null,
    };
  }

  componentDidMount = async () => {
    window.scrollTo(0, 0);
    // localStorage.setItem("CART-ITEMS", "asdasd");
    let res1 = await axios.get(
      process.env.REACT_APP_API + `detailProduct/${this.props.slugPath}`
    );
    this.setState({
      productDetail: res1 && res1.data ? res1.data[0] : {},
    });
    let res2 = await axios.get(process.env.REACT_APP_API + `randomProduct/4`);
    this.setState({
      randomProduct: res2 && res2.data ? res2.data : {},
    });
  };

  handleReadMore = () => {
    this.description.current.classList.toggle("show-text");
    if (this.description.current.classList.contains("show-text")) {
      this.readMoreBtn.current.classList.add("hide");
      this.collapseBtn.current.classList.remove("hide");
    } else {
      this.readMoreBtn.current.classList.remove("hide");
      this.collapseBtn.current.classList.add("hide");
    }
  };

  handleDecreaseBtn = () => {
    this.setState({
      amount: this.state.amount - 1 > 0 ? this.state.amount - 1 : 1,
    });
  };

  handleIncreaseBtn = () => {
    this.setState({
      amount: this.state.amount + 1,
    });
  };

  handleChangeAmount = () => {
    if (this.inputAmount.current.value) {
      this.setState({
        amount: parseInt(this.inputAmount.current.value),
      });
    }
  };

  checkAddToCart = (str) => {
    if (this.state.color === "" || this.state.color === null) {
      str += " màu sắc";
    }
    if (this.state.size === "" || this.state.size === null) {
      if (str !== "Lỗi") {
        str += ", kích thước ";
      } else {
        str += " kích thước";
      }
    }
    if (this.state.amount <= 0 || this.state.amount === "") {
      if (str !== "Lỗi") {
        str += ", số lượng ";
      } else {
        str += " số lượng";
      }
    }
    if (str === "Lỗi") {
      const item = this.state.productDetail;
      const temp = {
        cdAmount: this.state.amount,
        cdCar: null,
        cdColslug: this.state.color,
        cdPid: item.pId,
        cdSName: this.state.size,
        cdP: item,
      };
      return temp;
    } else {
      return str;
    }
  };

  handleAddToCart = () => {
    if (JSON.parse(localStorage.getItem("ACCOUNT")) === null) {
      alert("Bạn cần đăng nhập");
    } else {
      var str = "Lỗi";
      let result = this.checkAddToCart(str);
      if (typeof result === typeof "sting") {
        alert(result);
      } else {
        alert("Success");
        this.props.addToCartRedux(result);
      }
    }
  };

  handleChangePath = async (slugPath) => {
    let res = await axios.get(
      process.env.REACT_APP_API + `detailProduct/${slugPath}`
    );
    this.setState({
      productDetail: res && res.data ? res.data[0] : {},
    });
    window.scrollTo(0, 0);
  };

  render() {
    const { navigate } = this.props;
    return (
      <div
        className="product-view-container"
        key={this.state.productDetail.slug}
      >
        <div className="product-view row">
          <div className="product-view-image col-lg-7 col-12 row">
            <div className="product-view-image-thumb col-md-2">
              <div
                className="product-view-image-thumb1"
                onClick={() =>
                  this.setState({
                    imageDetail: document.querySelector(
                      ".product-view-image-thumb1 img"
                    ).src,
                  })
                }
              >
                <img
                  src={
                    this.state.productDetail.P_image &&
                    require(`../assets/images/products/${this.state.productDetail.pImage}`)
                  }
                  alt=""
                />
              </div>
              <div
                className="product-view-image-thumb2"
                onClick={() =>
                  this.setState({
                    imageDetail: document.querySelector(
                      ".product-view-image-thumb2 img"
                    ).src,
                  })
                }
              ></div>
            </div>
            <div className="product-view-image-detail col-md-10 col-12">
              <img
                src={
                  this.state.productDetail.pImage &&
                  require(`../assets/images/products/${this.state.productDetail.pImage}`)
                }
                alt=""
              />
            </div>
            <div className="product-view-image-thumb-small row">
              <div
                className="product-view-image-thumb1 col-4"
                onClick={() =>
                  this.setState({
                    imageDetail: document.querySelector(
                      ".product-view-image-thumb1 img"
                    ).src,
                  })
                }
              >
                <img
                  src={
                    this.state.productDetail.pImage &&
                    require(`../assets/images/products/${this.state.productDetail.pImage}`)
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="product-view-detail col-lg-5 col-12">
            <div className="product-view-detail-name">
              <h2>{this.state.productDetail.pName}</h2>
            </div>
            <div className="product-view-detail-price">
              {this.state.productDetail.pDiscount ||
              this.state.productDetail.pDiscount > 0 ? (
                <>
                  <del>
                    {parseInt(this.state.productDetail.pPrice)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    ₫
                  </del>
                  <span>
                    {parseInt(
                      this.state.productDetail.pPrice *
                        (1 - this.state.productDetail.pDiscount * 0.01)
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    ₫
                  </span>
                </>
              ) : (
                <span>
                  {parseInt(this.state.productDetail.pPrice)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  ₫
                </span>
              )}
            </div>
            <hr />
            <div className="product-view-detail-color">
              <h4>Màu sắc</h4>
              <div className="product-view-detail-color-list">
                {this.state.productDetail.colors &&
                  this.state.productDetail.colors.map((item, index) => (
                    <div
                      key={index}
                      className={
                        item.colSlug +
                        ` ${this.state.color === item.colSlug ? " active" : ""}`
                      }
                      onClick={() => this.setState({ color: item.colSlug })}
                    ></div>
                  ))}
              </div>
            </div>
            <div className="product-view-detail-size">
              <h4>Kích thước</h4>
              <div className="product-view-detail-size-list">
                {this.state.productDetail.sizes &&
                  this.state.productDetail.sizes.map((item, index) => (
                    <div
                      key={index}
                      className={this.state.size === item.sName ? "active" : ""}
                      onClick={() => this.setState({ size: item.sName })}
                    >
                      <span>{item.sName}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="product-view-detail-amount">
              <h4>Số lượng</h4>
              <div className="product-view-detail-amount-btn">
                <button
                  className="amount-decrease"
                  onClick={() => this.handleDecreaseBtn()}
                >
                  -
                </button>
                <input
                  type="number"
                  className="amount-input"
                  value={this.state.amount}
                  onChange={() => this.handleChangeAmount()}
                  ref={this.inputAmount}
                />
                <button
                  className="amount-increase"
                  onClick={() => this.handleIncreaseBtn()}
                >
                  +
                </button>
              </div>
            </div>
            <div className="product-view-detail-button row">
              <div className="product-view-detail-button1">
                <Button
                  text={"Thêm vào giỏ hàng"}
                  icon="addtocart"
                  onClick={() => this.handleAddToCart()}
                />
              </div>
              <div className="product-view-detail-button2">
                <Button
                  text={"Mua ngay"}
                  icon="buynow"
                  onClick={() => {
                    var str = "Lỗi";
                    let result = this.checkAddToCart(str);
                    if (typeof result === typeof "sting") {
                      alert(result);
                    } else {
                      if (
                        JSON.parse(localStorage.getItem("ACCOUNT")) !== null
                      ) {
                        this.props.addToCartRedux(result);
                        navigate("/cart");
                      } else {
                        alert("Bạn cần đăng nhập");
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="product-view-description">
          <h2>CHI TIẾT SẢN PHẨM</h2>
          <div className="product-view-description-text" ref={this.description}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              dolorem commodi facilis possimus quos fuga quae eveniet veniam
              facere saepe quisquam accusantium et, reprehenderit eligendi
              dolore porro molestiae iure fugit minus beatae error vero cum
              quidem! At enim laudantium, facilis expedita obcaecati maxime
              excepturi aliquid fuga veritatis quos cumque hic quam labore
              cupiditate nihil eveniet animi architecto atque eaque, iure
              debitis modi. Est incidunt doloribus impedit quod culpa adipisci
              itaque nobis nam delectus officiis, dolores recusandae odit ipsa
              odio officia fugiat tempora exercitationem at magnam alias
              veritatis. Minima animi vero culpa similique! Non perspiciatis
              iusto quod? Reprehenderit praesentium voluptate deleniti corrupti
              obcaecati sapiente culpa! Eaque, voluptatum nesciunt? Nostrum
              dolore praesentium quis est, voluptatum amet. Magni doloremque
              itaque, facilis vero, tempora ea incidunt nesciunt eius iure
              molestias in fuga nam sint et natus impedit provident nobis
              inventore facere dolorum aspernatur hic. Omnis neque mollitia
              optio ducimus quidem animi, odit tempore culpa dolorem minima
              maiores id veniam error repellendus consequatur. Ex atque magnam
              distinctio quaerat vitae voluptatum, inventore nihil possimus
              pariatur voluptatibus! Enim quidem, labore fuga reprehenderit
              tenetur accusantium recusandae explicabo a dolorum eum sapiente
              dignissimos quo blanditiis veniam asperiores beatae rem fugit
              ratione hic ut similique deleniti cupiditate numquam? Nihil
              placeat ipsum, in modi omnis molestiae totam quae officia
              asperiores voluptas rerum architecto aspernatur. Rerum placeat, et
              harum a quisquam sed impedit aperiam repellat, hic veniam maxime
              magnam. Ex quis facere aspernatur. Similique, culpa repellendus
              dignissimos expedita quis nisi asperiores molestias voluptates
              reiciendis, quidem officiis dicta odio odit quae magnam vero
              deleniti ea quasi, harum ex aspernatur nam. Doloremque amet culpa
              cum. Odio fugiat quaerat fuga vel maxime praesentium et cumque
              consequuntur, odit eum fugit. Dicta iste consequuntur, dolore
              magnam veritatis obcaecati excepturi vel perferendis, atque
              consectetur laboriosam odio qui id eveniet at quos adipisci
              nesciunt velit. Dolorum hic ad, culpa harum tempore adipisci
              corrupti laborum? Reprehenderit reiciendis quia ex fugiat. Tenetur
              molestias libero consectetur. Id quam officiis velit eaque
              adipisci itaque dolore, impedit assumenda sed? Laudantium
              aspernatur voluptates deserunt laboriosam quidem repellendus nemo
              ipsa, fuga, eos ad, nisi iusto obcaecati esse atque perspiciatis
              est mollitia. Voluptatum, repellat ipsum facilis illum voluptates
              cum ipsam quidem accusamus nam commodi temporibus quae
              consequuntur. Ea corrupti reprehenderit sunt quo? Dolores, aut
              dolore non dolor ipsa ullam, dolorem saepe cum voluptas sit
              accusantium natus ut amet fuga nesciunt aspernatur distinctio
              eaque veniam? Quos quasi numquam laboriosam nostrum tenetur minima
              quis placeat facere pariatur. Atque, aliquam numquam, consectetur
              quae ut ducimus dolores iusto unde commodi distinctio reiciendis
              ratione, facilis sit. Ut aspernatur commodi excepturi alias!
              Repudiandae quae eius autem eligendi dolorem sunt maxime?
              Pariatur, iste nam? Autem, obcaecati vitae iste tenetur suscipit
              dolore libero impedit. Perferendis eum doloribus a eaque laborum
              tempora at ipsa temporibus commodi quod asperiores deleniti,
              placeat nam sunt. Asperiores ea aperiam minima? Nemo nisi quos
              sunt quaerat. Necessitatibus molestiae veniam nobis doloribus
              recusandae ipsa earum, sequi aspernatur numquam asperiores nulla
              facilis fugit libero dolores, quaerat beatae quas impedit minus?
              Aliquid iure accusantium illo eius laborum accusamus. Magni
              laudantium laboriosam, soluta ex sequi exercitationem repellendus
              dolor suscipit ipsam debitis unde ad magnam accusantium dolorem
              pariatur amet iste officiis, beatae fuga incidunt. Veniam sed
              animi ut dolores. Omnis natus exercitationem expedita libero
              eligendi. Recusandae, dignissimos dolore? Et sapiente dolor
              doloremque odit asperiores molestias ullam ipsa ea, dignissimos
              laboriosam laborum quisquam ex natus maiores atque culpa.
              Corrupti, itaque quibusdam perspiciatis adipisci ea iste inventore
              facilis provident voluptatibus magnam qui similique voluptatem! Ab
              iusto reiciendis quo blanditiis quaerat dignissimos beatae
              laboriosam repellat, adipisci possimus molestiae odio ipsum cum,
              alias minus asperiores? Et dolore, minima vel alias qui sed animi
              praesentium numquam nam repellendus obcaecati amet veniam incidunt
              error perspiciatis beatae. Repudiandae modi nesciunt beatae cum
              labore perspiciatis aliquam voluptatum, dolorem vitae dolores?
              Nemo consectetur voluptas adipisci esse enim necessitatibus ipsam
              repellendus ab. Earum ipsam odit illum nihil laudantium eaque in
              porro eum. Delectus quo ipsam eveniet veniam autem! Reprehenderit
              a unde laborum cum reiciendis dolorem consequatur vel ratione ex
              repellat modi amet vero hic saepe optio, neque dicta! Molestiae id
              vitae dolore facilis excepturi ullam voluptatem. Molestiae saepe
              dicta recusandae distinctio rerum nihil quia similique illum, ea
              asperiores. Hic velit ut non alias ullam consequatur quia,
              impedit, quibusdam veritatis consectetur nesciunt labore beatae
              quis corrupti fuga.
            </p>
            <div className="linear-gradient"></div>
          </div>
          <div
            className="product-view-description-btn-readmore"
            ref={this.readMoreBtn}
          >
            <Button
              text="Đọc thêm"
              icon="readmore"
              onClick={() => this.handleReadMore()}
            />
          </div>
          <div
            className="product-view-description-btn-collapse hide"
            ref={this.collapseBtn}
          >
            <Button
              text="Thu gọn"
              icon="collapse"
              onClick={() => this.handleReadMore()}
            />
          </div>
        </div>
        <hr />
        <div className="product-view-more">
          <h3>CÓ THỂ BẠN MUỐN MUA</h3>
          <div className="product-view-more-items row">
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
                handleChangePath={() => this.handleChangePath(item.pSlug)}
              />
            ))}
          </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    addToCartRedux: (product) =>
      dispatch({ type: "ADD_TO_CART", payload: product }),
  };
};

function WithNavigate(props) {
  let navigate = useNavigate();
  return <ProductView {...props} navigate={navigate} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(WithNavigate);
