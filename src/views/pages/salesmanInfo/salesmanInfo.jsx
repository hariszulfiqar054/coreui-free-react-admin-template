import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { CAlert, CSpinner } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";

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
  console.log(salesmanInfo)
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
              Salesman Monthly Target :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>
              {salesmanInfo?.target}
            </span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Completed Orders :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>
              {orderCount?.completeOrders}
            </span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Accepted Orders :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>
              {orderCount?.acceptedOrders}
            </span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Pending Orders :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>
              {orderCount?.pendingOrders}
            </span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
              Salesman Cancelled Orders :{" "}
            </span>{" "}
            <span style={{ fontSize: "20px" }}>
              {orderCount?.cancelledOrders}
            </span>
          </div>
        </>
      )}
      <div className="w-100 d-flex justify-content-center">
        <CChart
          style={{
            width: "50%",
            height: "50%",
          }}
          type="bar"
          datasets={[
            {
              label: "Target",
              backgroundColor: "#51c4d3",
              borderColor: "#51c4d3",
              pointBackgroundColor: "#51c4d3",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#51c4d3",
              tooltipLabelColor: "#51c4d3",
              data: [salesmanInfo?.target],
            },
            {
              label: "Completed Orders",
              backgroundColor: "#a5e1ad",
              borderColor: "#a5e1ad",
              pointBackgroundColor: "#a5e1ad",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#a5e1ad",
              tooltipLabelColor: "#a5e1ad",
              data: [Number(orderCount?.completeOrders)],
            },
            {
              label: "Accepted Orders",
              backgroundColor: "#E98580",
              borderColor: "#E98580",
              pointBackgroundColor: "#E98580",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#E98580",
              tooltipLabelColor: "#E98580",
              data: [Number(orderCount?.acceptedOrders)],
            },
            {
              label: "Pending Orders",
              backgroundColor: "#fdca40",
              borderColor: "#fdca40",
              pointBackgroundColor: "#fdca40",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#fdca40",
              tooltipLabelColor: "#fdca40",
              data: [Number(orderCount?.pendingOrders)],
            },
            {
              label: "Cancelled Orders",
              backgroundColor: "#ff5200",
              borderColor: "#ff5200",
              pointBackgroundColor: "#ff5200",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#ff5200",
              tooltipLabelColor: "#ff5200",
              data: [Number(orderCount?.cancelledOrders)],
            },
          ]}
          options={{
            aspectRatio: 1.5,
            tooltips: {
              enabled: true,
            },
          }}
        />
      </div>
    </div>
  );
}

export default SalesmanInfo;
