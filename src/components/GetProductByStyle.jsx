import React from "react";
import { useParams } from "react-router-dom";

import Products from "../pages/Products";

function GetProductByStyle() {
  const { stylePath } = useParams();
  return (
    <div>
      <Products style={stylePath} />
    </div>
  );
}

export default GetProductByStyle;
