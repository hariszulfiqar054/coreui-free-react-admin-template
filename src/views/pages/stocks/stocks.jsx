import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";
import {
  CCard,
  CCardBody,
  CCardHeader,
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
} from "@coreui/react";

import usersData from "./dummyData";
import "./stocks.scss";

const Stocks = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [toggleMenu, setToggleMenu] = useState(null);
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/stocks?page=${newPage}`);
  };
  const [addStockToggle, setAddStockToggle] = useState(false);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <CRow>
      <CModal show={addStockToggle} onClose={() => setAddStockToggle(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Add Stock</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p className="model-text">Enter the Required information of stocks</p>
          <CForm>
            <CFormGroup>
              <CLabel>Item</CLabel>
              <CInput placeholder="Enter Item name.." />
              <CFormText className="help-block">
                Please enter item name
              </CFormText>
            </CFormGroup>
            <CFormGroup>
              <CLabel>Quantity</CLabel>
              <CInput placeholder="Enter Item quantity.." />
              <CFormText className="help-block">
                Please enter item quantity
              </CFormText>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Confirm</CButton>
          <CButton color="secondary" onClick={() => setAddStockToggle(false)}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      <CCol xl={12}>
        <CCard>
          <div className="header">
            <h3 className="header-txt">Stocks</h3>

            <CButton onClick={() => setAddStockToggle(true)}>
              <HiOutlinePlus size={30} />
            </CButton>
          </div>
          <hr />
          <CCardBody>
            <CDataTable
              items={usersData}
              tableFilter
              columnFilter
              fields={[
                { key: "id", _classes: "font-weight-bold" },
                { key: "item_name", label: "Item Name" },
                { key: "quantity", label: "Quantity" },
                { key: "city", label: "City" },

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
              itemsPerPage={5}
              activePage={page}
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
                          setToggleMenu(item?.id);
                          if (toggleMenu == item?.id) setToggleMenu(null);
                        }}
                      >
                        {toggleMenu == item?.id
                          ? "Hide Actions"
                          : "Show Actions"}
                      </CButton>
                    </td>
                  );
                },
                details: (item, index) => {
                  return (
                    <CCollapse show={toggleMenu == item?.id ? true : false}>
                      <CCardBody>
                        <CButton size="sm" color="info">
                          Update Stock items
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1">
                          Delete Stock
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
              pages={5}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Stocks;
