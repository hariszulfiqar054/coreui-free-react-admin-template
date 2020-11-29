import React from "react";
import { useSelector } from "react-redux";
function StockDetail(props) {
  const product = useSelector((state) => state?.stock?.currentItem);
  console.log(product);
  return (
    <div class="container">
      <h1 class="my-4">{product?.item_name?.toUpperCase()}</h1>

      <div class="row">
        <div class="col-md-8">
          <img class="img-fluid" src={product?.img} alt="" />
        </div>

        <div class="col-md-4">
          <h1 class="my-3">Stock Details</h1>
          <ul>
            <li>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>City </h2>
                <h3 className="mx-2">({product?.city})</h3>
              </div>
            </li>
            <li>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h2>Quantity </h2>
                <h3 className="mx-2">({product?.quantity})</h3>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StockDetail;
