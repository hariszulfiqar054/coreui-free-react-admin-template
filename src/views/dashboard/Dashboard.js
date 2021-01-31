import React, { lazy, useState } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";

import MainChartExample from "../charts/MainChartExample.js";
import { useQuery } from "react-query";
const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  const [isLoading, setLoading] = useState(false);
  const [homeData, setData] = useState(null);

  const getData = async () => {
    const response = await axios.get("home/home");
    return response.data;
  };

  const { data, status } = useQuery("homedata", getData);

  return (
    <>
      {status == "loading" && (
        <div className="d-flex justify-content-center">
          <CSpinner />
        </div>
      )}
      {status == "error" && <h2>Error While Getting Data</h2>}
      {status == "success" && (
        <>
          <WidgetsDropdown data={data} />
          <CCard>
            <CCardBody>
              <CRow>
                <CCol sm="5">
                  <h4 id="traffic" className="card-title mb-0">
                    Sales Data
                  </h4>
                  <div className="small text-muted">November 2017</div>
                </CCol>
                <CCol sm="7" className="d-none d-md-block">
                  <CButtonGroup className="float-right mr-3">
                    {["Month", "Year"].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === "Month"}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol>
              </CRow>
              <MainChartExample
                style={{ height: "300px", marginTop: "40px" }}
              />
            </CCardBody>
            <CCardFooter>
              <CRow className="text-center">
                <CCol md sm="12" className="mb-sm-2 mb-0">
                  <div className="text-muted">Completed Orders</div>
                  <strong>29.703 Users (40%)</strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="success"
                    value={40}
                  />
                </CCol>
                <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                  <div className="text-muted">Accepted Orders</div>
                  <strong>24.093 Users (20%)</strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="info"
                    value={40}
                  />
                </CCol>
                <CCol md sm="12" className="mb-sm-2 mb-0">
                  <div className="text-muted">Pending Orders</div>
                  <strong>78.706 Views (60%)</strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="warning"
                    value={40}
                  />
                </CCol>
                <CCol md sm="12" className="mb-sm-2 mb-0">
                  <div className="text-muted">Cancelled Orders</div>
                  <strong>22.123 Users (80%)</strong>
                  <CProgress
                    className="progress-xs mt-2"
                    precision={1}
                    color="danger"
                    value={40}
                  />
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </>
      )}
    </>
  );
};

export default Dashboard;
