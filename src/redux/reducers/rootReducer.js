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

// const getInitialState = async () => {
//   return await getApi().then((res) => res);
// };
var initialState = [];

const rootReducer = async (listItemInCart = initialState, action) => {
  // state = await getApi().then((result) => {
  //   return result.data[0].CartDetail;
  // });

  // listItemInCart = getApi().then((result) => {
  //   return result.data[0].CartDetail;
  // });
  if (username !== null) {
    listItemInCart = JSON.parse(localStorage.getItem("CART-ITEMS"));
  }
  // console.log(listItemInCart);
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
        // const addedItem = [...listItemInCart, newItem];
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
        // console.log()
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
        // return axios.post(addItemExistApi.split(" ").join("")).then((res) => {
        //   const temp = [
        //     ...listItemInCart.map((item, index) => {
        //       var itemAdded = { ...item };
        //       if (index === existItem) {
        //         itemAdded.CD_amount = itemAdded.CD_amount + newItem.CD_amount;
        //         return itemAdded;
        //       } else {
        //         return item;
        //       }
        //     }),
        //   ];
        //   return temp;
        // });
      }
      break;

    case "DECREASE":
      if (listItemInCart[existItem].CD_amount > 0) {
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
        return axios.post(decreaseItemApi.split(" ").join("")).then(() => {
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
        });
      }
      break;

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
      console.log(newItem);
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
            changeAmount.CD_amount -= newItem.CD_amount;
            return changeAmount;
          } else {
            return item;
          }
        }),
      ];
      setLocalStore(temp);
      return temp;
      break;

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
      axios
        .post(deleteItemApi.split(" ").join(""))
        .then((res) => console.log(res));
      break;
    // let existDelete = state.listProduct.findIndex(
    //   (item) =>
    //     item.slug === action.payload.slug &&
    //     item.color === action.payload.color &&
    //     item.size === action.payload.size
    // );
    // return {
    //   ...state,
    //   listProduct: state.listProduct.filter((x, index) => {
    //     if (index === existDelete) {
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }),
    // };

    default:
      return listItemInCart;
  }
};

export default rootReducer;
