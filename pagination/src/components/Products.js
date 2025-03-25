import React from "react";

function Products({ title, thumbnail }) {
  return (
    <div className="products__single">
      <img src={thumbnail} alt={title}></img>
      <p>{title}</p>
    </div>
  );
}

export default Products;
