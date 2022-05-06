import axios from "axios";

const username =
  JSON.parse(localStorage.getItem("ACCOUNT")) !== null
    ? JSON.parse(localStorage.getItem("ACCOUNT"))
    : null;

axios.get(process.env.REACT_APP_API + "getStyle").then((res) => {
  localStorage.setItem("CATEGORY", JSON.stringify(res.data));
});

const setLocalStore = (list) => {
  localStorage.setItem("CART-ITEMS", JSON.stringify(list));
};

var initialState = [];

const rootReducer = async (listItemInCart = initialState, action) => {
  // check logged in user
  if (username !== null) {
    var item =
      (await localStorage.getItem("CART-ITEMS")) &&
      localStorage.getItem("CART-ITEMS");
    if (item !== "undefined") {
      listItemInCart = await JSON.parse(item);
    }
  }

  let newItem = action.payload;

  let existItem =
    newItem &&
    listItemInCart.findIndex(
      (item) =>
        item.cdP.pSlug === newItem.cdP.pSlug &&
        item.cdColslug === newItem.cdColslug &&
        item.cdSName === newItem.cdSName
    );
  switch (action.type) {
    case "ADD_TO_CART":
      var indexOfItemAddToCart = listItemInCart.findIndex(
        (item) =>
          item.cdP.pSlug === newItem.cdP.pSlug &&
          item.cdColslug === newItem.cdColslug &&
          item.cdSName === newItem.cdSName
      );
      axios
        .get(process.env.REACT_APP_API + "getCartByUser/" + username)
        .then((res) => {
          listItemInCart = res.data[0].CartDetail;
        });
      // item haven't in array
      if (existItem === -1) {
        var addToCartApi =
          process.env.REACT_APP_API +
          "cart/insert?CD_PID=" +
          newItem.cdPid +
          "&username=" +
          username +
          "&CD_COLslug=" +
          newItem.cdColslug +
          "&CD_S_Name=" +
          newItem.cdSName +
          "&CD_amount=" +
          newItem.cdAmount;
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
          listItemInCart[indexOfItemAddToCart].cdP.pId +
          "&username=" +
          username +
          "&CD_COLslug=" +
          listItemInCart[indexOfItemAddToCart].cdColslug +
          "&CD_S_Name=" +
          listItemInCart[indexOfItemAddToCart].cdSName +
          "&amount=" +
          (listItemInCart[indexOfItemAddToCart].cdAmount + newItem.cdAmount);
        axios.post(addItemExistApi.split(" ").join(""));
        var temp = [
          ...listItemInCart.map((item, index) => {
            var itemAdded = { ...item };
            if (index === indexOfItemAddToCart) {
              itemAdded.cdAmount = itemAdded.cdAmount + newItem.cdAmount;
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
        listItemInCart[existItem].cdP.pId +
        "&username=" +
        username +
        "&CD_COLslug=" +
        listItemInCart[existItem].cdColslug +
        "&CD_S_Name=" +
        listItemInCart[existItem].cdSName +
        "&amount=" +
        (listItemInCart[existItem].cdAmount - 1);
      axios.post(decreaseItemApi.split(" ").join(""));
      var temp = [
        ...listItemInCart.map((item, index) => {
          var decreaseAmount = { ...item };
          if (index === existItem) {
            decreaseAmount.cdAmount -= 1;
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
        listItemInCart[existItem].cdP.pId +
        "&username=" +
        username +
        "&CD_COLslug=" +
        listItemInCart[existItem].cdColslug +
        "&CD_S_Name=" +
        listItemInCart[existItem].cdSName +
        "&amount=" +
        (listItemInCart[existItem].cdAmount + 1);
      axios.post(increaseItemApi.split(" ").join(""));
      var temp = [
        ...listItemInCart.map((item, index) => {
          var increaseAmount = { ...item };
          if (index === existItem) {
            increaseAmount.cdAmount += 1;
            return increaseAmount;
          } else {
            return item;
          }
        }),
      ];
      setLocalStore(temp);
      return temp;

    case "ON_CHANGE":
      if (newItem.cdAmount !== "") {
        var changeAmountItemApi =
          process.env.REACT_APP_API +
          "cart/update?CD_PID=" +
          listItemInCart[existItem].cdP.pId +
          "&username=" +
          username +
          "&CD_COLslug=" +
          listItemInCart[existItem].cdColslug +
          "&CD_S_Name=" +
          listItemInCart[existItem].cdSName +
          "&amount=" +
          newItem.cdAmount;
        axios.post(changeAmountItemApi.split(" ").join(""));
        var temp = [
          ...listItemInCart.map((item, index) => {
            var changeAmount = { ...item };
            if (index === existItem) {
              changeAmount.cdAmount = newItem.cdAmount;
              return changeAmount;
            } else {
              return item;
            }
          }),
        ];
      } else {
        var temp = [
          ...listItemInCart.map((item, index) => {
            var changeAmount = { ...item };
            if (index === existItem) {
              changeAmount.cdAmount = newItem.cdAmount;
              return changeAmount;
            } else {
              return item;
            }
          }),
        ];
      }
      setLocalStore(temp);
      return temp;

    case "ON_DELETE":
      var deleteItemApi =
        process.env.REACT_APP_API +
        "cart/delete?CD_PID=" +
        newItem.cdP.pId +
        "&username=" +
        username +
        "&CD_COLslug=" +
        newItem.cdColslug +
        "&CD_S_Name=" +
        newItem.cdSName;
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
