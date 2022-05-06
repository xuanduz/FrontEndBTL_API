import React from "react";
import Checkbox from "./Checkbox";

function RenderCategory(props) {
  return (
    <div>
      {props.items &&
        props.items.map((item, index) => (
          <Checkbox
            key={index}
            display={item.CA_name}
            item={item}
            checked={this.state.categoryChecked.includes(item.categorySlug)}
            onChange={(check, item) =>
              this.handleCheckbox("category", check, item)
            }
          />
        ))}
    </div>
  );
}

export default RenderCategory;
