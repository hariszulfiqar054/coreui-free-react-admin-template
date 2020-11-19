import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
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
import { useSelector } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi";
import "./user.scss";
import axios from "axios";

const Users = () => {
  const history = useHistory();
  const [toggleMenu, setToggleMenu] = useState(null);
  const [newSalesmanName, setNewSalesmanName] = useState(null);
  const [newSalesmanPassword, setNewSalesmanPassword] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [salesman, setSalesman] = useState([]);
  const city = useSelector((state) => state?.auth?.user?.city);
  useEffect(() => {
    getSalesmanHandler();
  }, []);

  const getSalesmanHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`user/getsalesman/${city}`);
      setSalesman(response?.data?.data);
    } catch (error) {}
    setLoading(true);
  };

  const [addStockToggle, setAddStockToggle] = useState(false);

  return (
    <div>
      <CRow>
        <CModal show={addStockToggle} onClose={() => setAddStockToggle(false)}>
          <CModalHeader closeButton>
            <CModalTitle>Add Salesman</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p className="model-text">
              Enter the Required information of salesman
            </p>
            <CForm>
              <CFormGroup>
                <CLabel>Contact</CLabel>
                <CInput placeholder="Enter Contact.." />
                <CFormText className="help-block">
                  Please enter salesman contact
                </CFormText>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="nf-password">Password</CLabel>
                <CInput
                  type="password"
                  id="nf-password"
                  name="nf-password"
                  placeholder="Enter Password.."
                  autoComplete="current-password"
                />
                <CFormText className="help-block">
                  Please enter your password
                </CFormText>
              </CFormGroup>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Confirm </CButton>
            <CButton color="secondary" onClick={() => setAddStockToggle(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CCol xl={12}>
          <CCard>
            <div className="header">
              <h3 className="header-txt">Salesman</h3>

              <CButton onClick={() => setAddStockToggle(true)}>
                <HiOutlinePlus size={30} />
              </CButton>
            </div>
            <hr />

            <CCardBody>
              <CDataTable
                items={salesman}
                tableFilter
                columnFilter
                fields={[
                  { key: "id", _classes: "font-weight-bold" },
                  { key: "name", label: "Name" },
                  { key: "password", label: "Password" },
                  { key: "contact", label: "Contact" },
                  { key: "role", label: "Role" },
                  { key: "city", label: "City" },
                  { key: "registered", label: "Registered" },

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
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Users;
