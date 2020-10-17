import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
} from "@coreui/react";

import usersData from "./UsersData";

const Users = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <CRow>
      {/* <CModal show={true} onClose={() => console.log("")}>
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
          <CButton color="primary">Do Something</CButton>{" "}
          <CButton color="secondary" onClick={() => console.log('asd')}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal> */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <CCol col="6" sm="4" md="2" xl='4' className="mb-3  ">
          <CButton block color="success">
            Add Salesman
          </CButton>
        </CCol>
      </div>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>Salesman</CCardHeader>
          <CCardBody>
            <CDataTable
              items={usersData}
              fields={[
                { key: "id", _classes: "font-weight-bold" },
                "name",
                "registered",
                "role",
              ]}
              hover
              striped
              itemsPerPage={5}
              activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
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

export default Users;
