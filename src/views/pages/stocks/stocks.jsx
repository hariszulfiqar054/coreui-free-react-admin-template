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
} from "@coreui/react";

import usersData from "./dummyData";
import "./stocks.scss";

const Stocks = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);
  const [toggleMenu, setToggleMenu] = useState(false);
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };
  const [addStockToggle, setAddStockToggle] = useState(false);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <CRow>
      <CModal show={addStockToggle} onClose={() => setAddStockToggle(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </CModalBody>
        <CModalFooter>
          <CButton color="primary">Do Something</CButton>
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
                  label: "",
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
                          setToggleMenu(!toggleMenu);
                        }}
                      >
                        {toggleMenu ? "Hide Actions" : "Show Actions"}
                      </CButton>
                    </td>
                  );
                },
                details: (item, index) => {
                  return (
                    <CCollapse show={toggleMenu}>
                      <CCardBody>
                        <CButton size="sm" color="info">
                          Update Salesman information
                        </CButton>
                        <CButton size="sm" color="danger" className="ml-1">
                          Delete Salesman
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
