import axios from "axios";

const username =
  JSON.parse(localStorage.getItem("ACCOUNT")) !== null
    ? JSON.parse(localStorage.getItem("ACCOUNT"))
    : null;

// const fetchData = async () => {
//   if (username !== null) {
//     const temp = await axios.get(
//       process.env.REACT_APP_API + "getCartByUser/" + username
//     );
//     return temp.data[0].CartDetail;
//   }
// };
// localStorage.setItem(
//   "CART-ITEMS",
//   JSON.stringify(fetchData().data[0].CartDetail)
// );
// const excute = async () => {
//   localStorage.setItem("CART-ITEMS", JSON.stringify(await fetchData()));
//   console.log(await fetchData());
// };
// excute();

// const items =
//   localStorage.getItem("CART-ITEMS") !== null
//     ? JSON.parse(localStorage.getItem("CART-ITEMS"))
//     : [];

// localStorage.setItem(
//   "CART-Items",
//   JSON.stringify(
//     axios
//       .get(process.env.REACT_APP_API + "getCartByUser/" + username)
//       .then((res) => res.data[0].CartDetail)
//   )
// );

// var initState = {
//   listProduct: [
//     {
//       a: 1,
//     },
//     {
//       a: 2,
//     },
//   ],
// };
var initState = [];

const setLocalStore = (list) => {
  localStorage.setItem("CART-ITEMS", JSON.stringify(list));
};

var initialState = [];

const rootReducer = async (listItemInCart = initialState, action) => {
  if (username !== null) {
    listItemInCart = JSON.parse(
      localStorage.getItem("CART-ITEMS") && localStorage.getItem("CART-ITEMS")
    );
  }
  let newItem = action.payload;

  let existItem =
    newItem &&
    listItemInCart.findIndex(
      (item) =>
        item.P_slug === newItem.P_slug &&
        item.CD_COLslug === newItem.CD_COLslug &&
        item.CD_S_name === newItem.CD_S_name
    );

  switch (action.type) {
    case "ADD_TO_CART":
      axios
        .get(process.env.REACT_APP_API + "getCartByUser/" + username)
        .then((res) => {
          listItemInCart = res.data[0].CartDetail;
        });
      console.log(listItemInCart);
      // item haven't in array
      if (existItem === -1) {
        var addToCartApi =
          process.env.REACT_APP_API +
          "cart/?CD_PID=" +
          newItem.CD_PID +
          "&username=" +
          username +
          "&CD_COLslug=" +
          newItem.CD_COLslug +
          "&CD_S_name=" +
          newItem.CD_S_name +
          "&CD_amount=" +
          newItem.CD_amount;
        axios.post(addToCartApi.split(" ").join(""));
        var temp = [...listItemInCart, newItem];
        setLocalStore(temp);
        return temp;
      }
      // item exist in array
      else {
        var addItemExistApi =
          process.env.REACT_APP_API +
          "cart/update?CD_PID=" +
          listItemInCart[existItem].CD_PID +
          "&username=" +
          username +
          "&CD_COLslug=" +
          listItemInCart[existItem].CD_COLslug +
          "&CD_S_name=" +
          listItemInCart[existItem].CD_S_name +
          "&amount=" +
          (listItemInCart[existItem].CD_amount + newItem.CD_amount);
        axios.post(addItemExistApi.split(" ").join(""));
        var temp = [
          ...listItemInCart.map((item, index) => {
            var itemAdded = { ...item };
            if (index === existItem) {
              itemAdded.CD_amount = itemAdded.CD_amount + newItem.CD_amount;
              return itemAdded;
            } else {
              return item;
            }
          }),
        ];
        setLocalStore(temp);
        return temp;
      }

    case "DECREASE":
      var decreaseItemApi =
        process.env.REACT_APP_API +
        "cart/update?CD_PID=" +
        listItemInCart[existItem].CD_PID +
        "&username=" +
        username +
        "&CD_COLslug=" +
        listItemInCart[existItem].CD_COLslug +
        "&CD_S_name=" +
        listItemInCart[existItem].CD_S_name +
        "&amount=" +
        (listItemInCart[existItem].CD_amount - 1);
      axios.post(decreaseItemApi.split(" ").join(""));
      var temp = [
        ...listItemInCart.map((item, index) => {
          var decreaseAmount = { ...item };
          if (index === existItem) {
            decreaseAmount.CD_amount -= 1;
            return decreaseAmount;
          } else {
            return item;
          }
        }),
      ];
      setLocalStore(temp);
      return temp;

    case "INCREASE":
      var increaseItemApi =
        process.env.REACT_APP_API +
        "cart/update?CD_PID=" +
        listItemInCart[existItem].CD_PID +
        "&username=" +
        username +
        "&CD_COLslug=" +
        listItemInCart[existItem].CD_COLslug +
        "&CD_S_name=" +
        listItemInCart[existItem].CD_S_name +
        "&amount=" +
        (listItemInCart[existItem].CD_amount + 1);
      axios.post(increaseItemApi.split(" ").join(""));
      var temp = [
        ...listItemInCart.map((item, index) => {
          var increaseAmount = { ...item };
          if (index === existItem) {
            increaseAmount.CD_amount += 1;
            return increaseAmount;
          } else {
            return item;
          }
        }),
      ];
      setLocalStore(temp);
      return temp;

    case "ON_CHANGE":
      console.log("onchange ", newItem);
      if (newItem.CD_amount !== "") {
        var changeAmountItemApi =
          process.env.REACT_APP_API +
          "cart/update?CD_PID=" +
          listItemInCart[existItem].CD_PID +
          "&username=" +
          username +
          "&CD_COLslug=" +
          listItemInCart[existItem].CD_COLslug +
          "&CD_S_name=" +
          listItemInCart[existItem].CD_S_name +
          "&amount=" +
          newItem.CD_amount;
        axios.post(changeAmountItemApi.split(" ").join(""));
        var temp = [
          ...listItemInCart.map((item, index) => {
            var changeAmount = { ...item };
            if (index === existItem) {
              changeAmount.CD_amount = newItem.CD_amount;
              return changeAmount;
            } else {
              return item;
            }
          }),
        ];
        setLocalStore(temp);
        return temp;
      } else {
        break;
      }

    case "ON_DELETE":
      console.log("delete item ", newItem);
      var deleteItemApi =
        process.env.REACT_APP_API +
        "cart/delete?CD_PID=" +
        newItem.CD_PID +
        "&username=" +
        username +
        "&CD_COLslug=" +
        newItem.CD_COLslug +
        "&CD_S_name=" +
        newItem.CD_S_name;
      axios.post(deleteItemApi.split(" ").join(""));
      var temp = [
        ...listItemInCart.filter((item, index) => {
          if (index === existItem) {
            return false;
          } else {
            return true;
          }
        }),
      ];
      setLocalStore(temp);
      return temp;

    default:
      return listItemInCart;
  }
};

export default rootReducer;
