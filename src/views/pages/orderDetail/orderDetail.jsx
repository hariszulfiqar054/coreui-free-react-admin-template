import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

function OrderDetail(props) {
  const currentOrder = useSelector((state) => state?.stock?.cuurentOrder);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Order Details</h1>
      <div style={{ marginTop: "10px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Order Taken By :{" "}
        </span>{" "}
        <span style={{ fontSize: "20px" }}>
          {currentOrder?.orderTakenBy?.name}
        </span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Order City :{" "}
        </span>{" "}
        <span style={{ fontSize: "20px" }}>
          {currentOrder?.orderTakenBy?.city}
        </span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Order Date :{" "}
        </span>{" "}
        <span style={{ fontSize: "20px" }}>
          {moment(currentOrder?.createdAt)?.format("DD MMM, YYYY")}
        </span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Shop Name :{" "}
        </span>{" "}
        <span style={{ fontSize: "20px" }}>{currentOrder?.shopName}</span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Shop Address :{" "}
        </span>{" "}
        <span style={{ fontSize: "20px" }}>{currentOrder?.shopAddress}</span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Shop Owner Name :{" "}
        </span>{" "}
        <span style={{ fontSize: "20px" }}>{currentOrder?.shopOwnerName}</span>
      </div>
      <div style={{ marginTop: "10px" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Shop Owner Contact :{" "}
        </span>{" "}
        <span style={{ fontSize: "20px" }}>
          {currentOrder?.shopOwnerContact}
        </span>
      </div>
      <h1 style={{ textAlign: "center" }}>Order Items</h1>
      <div>
        {currentOrder?.items?.map(({ item_name, price, orderQty }) => (
          <div>
            <div style={{ marginTop: "10px" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Item Name :{" "}
              </span>{" "}
              <span style={{ fontSize: "20px" }}>{item_name}</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Item Price :{" "}
              </span>{" "}
              <span style={{ fontSize: "20px" }}>{price}</span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Item Ordered Quantity :{" "}
              </span>{" "}
              <span style={{ fontSize: "20px" }}>{orderQty}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderDetail;
