import React from "react";
import { CChart } from "@coreui/react-chartjs";

const MainChartExample = ({ total, complete, cancel, pending, accept }) => {
  console.log(accept);
  return (
    <div className="w-100 d-flex justify-content-center">
      <CChart
        style={{
          width: "50%",
          height: "50%",
        }}
        type="bar"
        datasets={[
          {
            label: "Total Orders",
            backgroundColor: "#51c4d3",
            borderColor: "#51c4d3",
            pointBackgroundColor: "#51c4d3",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#51c4d3",
            tooltipLabelColor: "#51c4d3",
            data: [total],
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
            data: [Number(complete)],
          },
          {
            label: "Accepted Orders",
            backgroundColor: "#161d6f",
            borderColor: "#161d6f",
            pointBackgroundColor: "#161d6f",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#161d6f",
            tooltipLabelColor: "#161d6f",
            data: [Number(accept)],
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
            data: [Number(pending)],
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
            data: [Number(cancel)],
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
  );
};

export default MainChartExample;
