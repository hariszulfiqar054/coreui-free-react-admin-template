import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CCollapse,
  CForm,
  CFormGroup,
  CFormText,
  CLabel,
  CInput,
  CSpinner,
  CAlert,
} from "@coreui/react";
import axios from "axios";
import { usePaginatedQuery } from "react-query";
import { setCurrentItem } from "../../../redux/actions/stock.action";
import { useDispatch } from "react-redux";
import "./stocks.scss";

const Stocks = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [toggleMenu, setToggleMenu] = useState(null);
  const [addStockToggle, setAddStockToggle] = useState(false);
  const [addLoading, setaddLoading] = useState(false);
  const [announceTxt, setAnnounceTxt] = useState(null);
  const [itemQty, setItemQty] = useState("");
  const [img, setImg] = useState(null);
  const [addAnnErr, setAddAnnErr] = useState(null);
  const [currAnn, setCurrAnn] = useState(null);
  const [delErr, setDelErr] = useState(null);
  const [delModel, setDelModel] = useState(false);
  const [actionType, setActionType] = useState();
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/stocks?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const dispatch = useDispatch();

  //Get Stocks Item
  const getStock = async () => {
    const response = await axios.get(`stocks/allStocks?page=${page}&limit=5`);
    return response?.data;
  };

  const { status, resolvedData, refetch } = usePaginatedQuery(
    ["stock", page],
    getStock
  );

  //Delete Item
  const deleteItem = async () => {
    console.log(currAnn);
    setaddLoading(true);
    try {
      const response = await axios.delete("stocks/deleteStock", {
        data: { id: currAnn },
      });
      if (response?.data) {
        setAnnounceTxt("");
        setDelModel(false);
        refetch();
      }
    } catch (error) {
      setDelErr("Error while deleting announcement");
    }
    setaddLoading(false);
  };

  //Update Item
  const updateItem = async () => {
    if (!announceTxt && !itemQty) {
      setAddAnnErr("Fill Atleast one field");
    } else {
      setaddLoading(true);
      const data = {};
      if (announceTxt) data.item_name = announceTxt;
      if (itemQty) data.quantity = Number(itemQty);
      data.id = currAnn;
      try {
        const response = await axios.put("stocks/updateStocks", data);
        if (response?.data) {
          setAnnounceTxt("");
          setItemQty("");
          setAddStockToggle(false);
          refetch();
        }
      } catch (error) {
        setAddAnnErr("Error while updating item");
      }
      setaddLoading(false);
    }
  };

  //Add Item
  const addItem = async () => {
    if (!announceTxt || !itemQty || !img) {
      setAddAnnErr("Fill all fields");
    } else if (!/^\d+$/.test(itemQty)) {
      setAddAnnErr("Quantity Should be in numeric");
    } else {
      setaddLoading(true);
      try {
        const formBody = new FormData();
        formBody.append("item_name", announceTxt);
        formBody.append("quantity", Number(itemQty));
        formBody.append("img", img, img?.name);
        const response = await axios.post("stocks/addItem", formBody);
        if (response?.data) {
          setAnnounceTxt("");
          setItemQty("");
          setImg(null);
          setAddStockToggle(false);
          refetch();
        }
      } catch (error) {
        console.log(error?.response?.data);
        setAddAnnErr("Error while adding item");
      }
      setaddLoading(false);
    }
  };

  return (
    <div>
      <CRow>
        <CModal color="danger" show={delModel} size="sm">
          {delErr && (
            <CAlert style={{ textAlign: "center" }} color="danger">
              {delErr}
            </CAlert>
          )}
          <CModalHeader closeButton>
            <CModalTitle>Delete Announcement</CModalTitle>
          </CModalHeader>
          <CModalBody>Are you sure you want to delete this Item ?</CModalBody>
          {addLoading ? (
            <div
              className="mb-3"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CSpinner />
            </div>
          ) : (
            <CModalFooter>
              <CButton onClick={deleteItem} color="danger">
                Confirm
              </CButton>
              <CButton onClick={() => setDelModel(false)} color="secondary">
                Cancel
              </CButton>
            </CModalFooter>
          )}
        </CModal>
        <CModal show={addStockToggle} onClose={() => setAddStockToggle(false)}>
          {addAnnErr && (
            <CAlert style={{ textAlign: "center" }} color="danger">
              {addAnnErr}
            </CAlert>
          )}
          <CModalHeader closeButton>
            <CModalTitle>
              {actionType == "add" ? "Add Stock" : "Update Stock"}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p className="model-text">
              Enter the Required information of stocks
            </p>
            <CForm>
              <CFormGroup>
                <CLabel>Item</CLabel>
                <CInput
                  value={announceTxt}
                  onChange={(e) => setAnnounceTxt(e.target.value)}
                  placeholder="Enter Item name.."
                />
                <CFormText className="help-block">
                  Please enter item name
                </CFormText>
              </CFormGroup>
              {actionType == "add" && (
                <CFormGroup>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <CLabel>Item Image</CLabel>
                    <input
                      type="file"
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </div>
                </CFormGroup>
              )}
              <CFormGroup>
                <CLabel>Quantity</CLabel>
                <CInput
                  value={itemQty}
                  onChange={(e) => setItemQty(e.target.value)}
                  placeholder="Enter Item quantity.."
                />
                <CFormText className="help-block">
                  Please enter item quantity
                </CFormText>
              </CFormGroup>
            </CForm>
          </CModalBody>
          {addLoading ? (
            <div
              className="mb-3"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CSpinner />
            </div>
          ) : (
            <CModalFooter>
              <CButton
                onClick={actionType == "add" ? addItem : updateItem}
                color="primary"
              >
                Confirm
              </CButton>
              <CButton
                color="secondary"
                onClick={() => setAddStockToggle(false)}
              >
                Cancel
              </CButton>
            </CModalFooter>
          )}
        </CModal>

        {status == "error" && (
          <CCol
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            xl={12}
          >
            <h1>Error while getting data</h1>
          </CCol>
        )}
        {status == "loading" && (
          <CCol
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            xl={12}
          >
            <CSpinner />
          </CCol>
        )}

        {status == "success" && (
          <CCol xl={12}>
            <CCard>
              <div className="header">
                <h3 className="header-txt">Stocks</h3>

                <CButton
                  onClick={() => {
                    setActionType("add");
                    setAddStockToggle(true);
                  }}
                >
                  <HiOutlinePlus size={30} />
                </CButton>
              </div>
              <hr />
              <CCardBody>
                <CDataTable
                  items={resolvedData?.data}
                  tableFilter
                  columnFilter
                  fields={[
                    { key: "_id", _classes: "font-weight-bold" },
                    {
                      key: "item_name",
                      label: "Item Name",
                      _classes: "font-weight-bold text-uppercase text-center",
                    },
                    {
                      key: "quantity",
                      label: "Quantity",
                      _classes: "text-center",
                    },
                    { key: "city", label: "City", _classes: "text-center" },

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
                  activePage={page}
                  pagination
                  itemsPerPage={resolvedData?.data?.length}
                  // clickableRows
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
                            <CButton
                              onClick={() => {
                                setActionType(null);
                                setAddStockToggle(true);
                                setCurrAnn(item?._id);
                              }}
                              size="sm"
                              color="info"
                            >
                              Update Stock items
                            </CButton>
                            <CButton
                              onClick={() => {
                                setCurrAnn(item?._id);
                                setDelModel((data) => !data);
                              }}
                              size="sm"
                              color="danger"
                              className="ml-1"
                            >
                              Delete Stock
                            </CButton>
                            <CButton
                              onClick={() => {
                                history.push("/stockDetail");
                                dispatch(setCurrentItem(item));
                              }}
                              className="ml-1"
                              size="sm"
                              color="warning"
                            >
                              View Item
                            </CButton>
                          </CCardBody>
                        </CCollapse>
                      );
                    },
                  }}
                  // onRowClick={(item) => history.push(`/users/${item.id}`)}
                />
                <CPagination
                  activePage={page}
                  onActivePageChange={pageChange}
                  pages={resolvedData?.total_pages}
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

export default Stocks;
