import React, { lazy, useState, useEffect } from "react";
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
  CAlert,
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
  const [chatroomError, setChatroomError] = useState("");

  useEffect(() => {
    createChatroom();
  }, []);

  const createChatroom = async () => {
    try {
      const response = await axios.post("chat/createChatroom");
      console.log(response?.data, response?.status);
    } catch (error) {
      setChatroomError(error);
      setTimeout(() => setChatroomError(""), 3000);
    }
  };

  const getData = async () => {
    const response = await axios.get("home/home");
    return response.data;
  };

  const { data, status } = useQuery("homedata", getData);

  return (
    <div>
      {chatroomError?.length > 0 ? (
        <CAlert className="text-center" color="danger">
          {chatroomError}
        </CAlert>
      ) : null}
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
                  </CCol>
                </CRow>
                <MainChartExample
                  style={{ height: "300px", marginTop: "40px" }}
                  complete={data?.data?.orders?.completed}
                  accept={data?.data?.orders?.accepted}
                  cancel={data?.data?.orders?.cancelled}
                  pending={data?.data?.orders?.pending}
                  total={
                    Number(data?.data?.orders?.pending) +
                    Number(data?.data?.orders?.cancelled) +
                    Number(data?.data?.orders?.accepted) +
                    Number(data?.data?.orders?.completed)
                  }
                />
              </CCardBody>
              <CCardFooter>
                <CRow className="text-center">
                  <CCol md sm="12" className="mb-sm-2 mb-0">
                    <div className="text-muted">Completed Orders</div>
                    <strong>{data?.data?.orders?.completed}</strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="success"
                      value={parseInt(data?.data?.orders?.completed)}
                    />
                  </CCol>
                  <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Accepted Orders</div>
                    <strong>{data?.data?.orders?.accepted}</strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="info"
                      value={parseInt(data?.data?.orders?.accepted)}
                    />
                  </CCol>
                  <CCol md sm="12" className="mb-sm-2 mb-0">
                    <div className="text-muted">Pending Orders</div>
                    <strong>{data?.data?.orders?.pending}</strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="warning"
                      value={parseInt(data?.data?.orders?.pending)}
                    />
                  </CCol>
                  <CCol md sm="12" className="mb-sm-2 mb-0">
                    <div className="text-muted">Cancelled Orders</div>
                    <strong>{data?.data?.orders?.cancelled}</strong>
                    <CProgress
                      className="progress-xs mt-2"
                      precision={1}
                      color="danger"
                      value={parseInt(data?.data?.orders?.cancelled)}
                    />
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </>
        )}
      </>
    </div>
  );
};

export default Dashboard;
