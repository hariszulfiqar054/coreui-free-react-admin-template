import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CSpinner,
  CAlert,
  CButton,
  CCollapse,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import "./user.scss";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setCurrentOrder } from "../../../redux/actions/stock.action";
import orderStatus from "../../../constants/orderStatus";

const OrderPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [toggleMenu, setToggleMenu] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [apiStatus, setStatus] = useState({ success: "", error: "" });
  const [modelInfo, setModelInfo] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/order?page=${newPage}`);
  };

  const getOrders = async () => {
    const response = await axios.get(
      `order/orderByCities?page"${page > 0 ? page : 1}`
    );

    return response.data;
  };

  const { status, refetch, data } = useQuery(["order", page], getOrders);
  console.log(status);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const cancelOrder = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put("order/cancelOrder", { id });
      if (response?.data) {
        setStatus({ success: response?.data?.message, error: "" });
        refetch();
      }
      setTimeout(() => setStatus({ success: "", error: "" }), 3000);
      setShowModel(false);
    } catch (error) {
      setStatus({
        success: "",
        error: error?.response?.data?.message || error.message,
      });
      setTimeout(() => setStatus({ success: "", error: "" }), 3000);
    }
    setLoading(false);
  };

  const acceptOrder = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put("order/approveOrder", { id });
      if (response?.data) {
        setStatus({ success: response?.data?.message, error: "" });
        refetch();
      }
      setTimeout(() => setStatus({ success: "", error: "" }), 3000);
      setShowModel(false);
    } catch (error) {
      setStatus({
        success: "",
        error: error?.response?.data?.message || error.message,
      });
      setTimeout(() => setStatus({ success: "", error: "" }), 3000);
    }
    setLoading(false);
  };

  const completeOrder = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put("order/completeOrder", { id });
      if (response?.data) {
        setStatus({ success: response?.data?.message, error: "" });
        refetch();
      }
      setTimeout(() => setStatus({ success: "", error: "" }), 3000);
      setShowModel(false);
    } catch (error) {
      setStatus({
        success: "",
        error: error?.response?.data?.message || error.message,
      });
      setTimeout(() => setStatus({ success: "", error: "" }), 3000);
    }
    setLoading(false);
  };

  return (
    <div>
      {apiStatus.success || apiStatus.error ? (
        <CAlert
          color={apiStatus.success ? "success" : "danger"}
          style={{ width: "100%", textAlign: "center" }}
        >
          {apiStatus.success || apiStatus.error}
        </CAlert>
      ) : null}
      <CModal
        show={showModel}
        onClose={() => setShowModel(false)}
        color={
          modelInfo == orderStatus.cancel
            ? "danger"
            : modelInfo == orderStatus.accept
            ? "primary"
            : "success"
        }
      >
        <CModalHeader closeButton>
          <CModalTitle>
            {modelInfo == orderStatus.cancel
              ? "Cancel Order"
              : modelInfo == orderStatus.completed
              ? "Complete Order"
              : "Accept Order"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to{" "}
          {modelInfo == orderStatus.cancel
            ? "Cancel Order"
            : modelInfo == orderStatus.completed
            ? "Complete Order"
            : "Accept Order"}{" "}
          ?
        </CModalBody>
        {isLoading ? (
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
            className="mb-3"
          >
            <CSpinner />
          </div>
        ) : (
          <CModalFooter>
            <CButton
              color={
                modelInfo == orderStatus.cancel
                  ? "danger"
                  : modelInfo == orderStatus.accept
                  ? "primary"
                  : "success"
              }
              onClick={() => {
                if (modelInfo == orderStatus.cancel) {
                  cancelOrder(selectedOrder);
                  refetch();
                } else if (modelInfo == orderStatus.accept) {
                  acceptOrder(selectedOrder);
                  refetch();
                } else {
                  completeOrder(selectedOrder);
                  refetch();
                }
              }}
            >
              {modelInfo == orderStatus.cancel
                ? "Cancel Order"
                : modelInfo == orderStatus.completed
                ? "Complete Order"
                : "Accept Order"}
            </CButton>
            <CButton color="secondary" onClick={() => setShowModel(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        )}
      </CModal>
      <CRow>
        {status === "loading" && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CSpinner />
          </div>
        )}
        {status === "error" && (
          <CAlert
            style={{ width: "100%", fontSize: 30, textAlign: "center" }}
            color="danger"
          >
            Error While Getting Data!
          </CAlert>
        )}
        {status === "success" && (
          <CCol xl={12}>
            <CCard>
              <CCardHeader>
                <div className="header">
                  <h3 className="header-txt">Orders</h3>
                </div>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={data?.data}
                  fields={[
                    { key: "_id", _classes: "font-weight-bold", filter: false },
                    { key: "city", label: "City", filter: false },
                    {
                      key: "status",
                      label: "Order Status",
                      _classes: "font-weight-bold",
                    },
                    {
                      key: "shopName",
                      label: "Shop Name",
                      _classes: "font-weight-bold",
                    },
                    {
                      key: "createdAt",
                      label: "Order Taken Date",
                      filter: false,
                    },
                    {
                      key: "show_details",
                      label: "Actions",
                      _style: { width: "3%" },
                      sorter: false,
                      filter: false,
                    },
                  ]}
                  hover
                  striped
                  itemsPerPage={data?.data?.length}
                  activePage={page}
                  clickableRows
                  tableFilter
                  columnFilter
                  pagination
                  scopedSlots={{
                    show_details: (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => {
                              setToggleMenu(item?._id);
                              if (toggleMenu == item?._id) setToggleMenu(null);
                            }}
                          >
                            {toggleMenu == item?._id
                              ? "Hide Actions"
                              : "Show Actions"}
                          </CButton>
                        </td>
                      );
                    },
                    details: (item, index) => {
                      return (
                        <CCollapse
                          show={toggleMenu == item?._id ? true : false}
                        >
                          <CCardBody>
                            {item?.status === orderStatus.completed ||
                            item?.status === orderStatus.cancel ||
                            item?.status === orderStatus.accept ? null : (
                              <>
                                <CButton
                                  onClick={() => {
                                    setSelectedOrder(item?._id);
                                    setModelInfo(orderStatus.accept);
                                    setShowModel(true);
                                  }}
                                  size="sm"
                                  color="info"
                                >
                                  Accept Order
                                </CButton>
                                <CButton
                                  onClick={() => {
                                    setSelectedOrder(item?._id);
                                    setModelInfo(orderStatus.cancel);
                                    setShowModel(true);
                                  }}
                                  size="sm"
                                  color="danger"
                                  className="ml-1"
                                >
                                  Cancel Order
                                </CButton>
                              </>
                            )}
                            {item?.status === orderStatus.accept ? (
                              <CButton
                                onClick={() => {
                                  setSelectedOrder(item?._id);
                                  setModelInfo(orderStatus.completed);
                                  setShowModel(true);
                                }}
                                size="sm"
                                color="success"
                              >
                                Complete Order
                              </CButton>
                            ) : null}

                            <CButton
                              onClick={() => {
                                dispatch(setCurrentOrder(item));
                                history.push("/orderDetail");
                              }}
                              className="ml-1"
                              size="sm"
                              color="warning"
                            >
                              View Order Detail
                            </CButton>
                          </CCardBody>
                        </CCollapse>
                      );
                    },
                  }}
                />
                <CPagination
                  activePage={page}
                  onActivePageChange={pageChange}
                  pages={data?.total_pages}
                  doubleArrows={false}
                  align="center"
                />
              </CCardBody>
            </CCard>
          </CCol>
        )}
      </CRow>
    </div>
  );
};
export default OrderPage;
