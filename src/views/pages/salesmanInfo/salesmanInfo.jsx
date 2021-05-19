import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { CAlert, CSpinner } from "@coreui/react";

function SalesmanInfo(props) {
  const [isLoading, setLoading] = useState(false);
  const [orderCount, setOrderCount] = useState(null);
  const [isError, setError] = useState("");
  const salesmanInfo = useSelector((state) => state?.stock?.selectedSalesman);

  useEffect(() => {
    getOrderCount();
  }, [salesmanInfo]);

  const getOrderCount = async () => {
    setLoading(true);
    try {
      const response = await axios.post("order/orderCount", {
        id: salesmanInfo?._id,
      });
      setOrderCount(response?.data?.data);
    } catch (error) {
      setError(error?.response?.data?.message || error?.message);
      setTimeout(() => setError(""), 3000);
    }
    setLoading(false);
  };
  return (
    <div>
      {isError.length > 0 && (
        <CAlert color="danger" style={{ width: "100%", textAlign: "center" }}>
          {isError}
        </CAlert>
      )}
      {isLoading ? (
        <div className="w-100 d-flex justify-content-center">
          <CSpinner />
        </div>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Salesman Information</h1>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Name :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>{salesmanInfo?.name}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Contact :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>{salesmanInfo?.contact}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman City :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>{salesmanInfo?.city}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Joining Date :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>
              {moment(salesmanInfo?.time_stamp).format("DD MMM, YYYY")}
            </span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Completed Orders :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>{orderCount?.completeOrders}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Accepted Orders :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>{orderCount?.acceptedOrders}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Pending Orders :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>{orderCount?.pendingOrders}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Cancelled Orders :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>{orderCount?.cancelledOrders}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default SalesmanInfo;
