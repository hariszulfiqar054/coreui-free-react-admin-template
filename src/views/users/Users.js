import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
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
  CSpinner,
  CHeader,
  CAlert,
} from "@coreui/react";
import { useSelector } from "react-redux";
import { HiOutlinePlus } from "react-icons/hi";
import "./user.scss";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

const Users = () => {
  const history = useHistory();
  const [toggleMenu, setToggleMenu] = useState(null);
  const [addSalesmanLoading, setAddSalesmanLoading] = useState(false);
  const [addSalesmanErr, setaddSalesmanErr] = useState(null);
  const [addStockToggle, setAddStockToggle] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteUserId, setDeleteUserid] = useState(null);
  const [deleteErr, setDeleteErr] = useState(null);
  const [actionType, setActionType] = useState("");
  const [updateUser, setUpdateUser] = useState(null);
  const city = useSelector((state) => state?.auth?.user?.city);

  //Get the salesman
  const getSalesmanHandler = async () => {
    const response = await axios.get(`user/getsalesman/${city}`);
    return response?.data?.data;
  };
  const { data, status, refetch } = useQuery("salesman", getSalesmanHandler);

  //Delete the salesman
  const deleteSalesman = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete("user/removesaleman", {
        data: { id: id },
      });
      if (response?.data) {
        refetch();
        setDeleteModel(false);
      }
    } catch (error) {
      setDeleteErr("Unbale to delete salesman");
    }
    setLoading(false);
  };

  //Add Salesman
  const addSalesman = async ({ name, contact, password }) => {
    if (actionType == "add") {
      setAddSalesmanLoading(true);
      try {
        const response = await axios.post("user/addsalesman", {
          name,
          contact,
          password,
        });
        if (response?.data) {
          setAddStockToggle(false);
          refetch();
        }
      } catch (error) {
        error?.response?.data?.message?.includes("number")
          ? setaddSalesmanErr("Salesman with this number already exist.")
          : setaddSalesmanErr("Unable to add salesman.");
      }
      setAddSalesmanLoading(false);
    } else {
      const data = {};
      if (name) data.name = name;
      if (password) data.password = password;
      if (contact) data.contact = contact;
      data.id = updateUser?._id;
      setAddSalesmanLoading(true);
      try {
        const response = await axios.put("user/updatesalesman", data);
        if (response?.data) {
          refetch();
          setAddStockToggle(false);
        }
      } catch (error) {
        setaddSalesmanErr("Error while updating salesman information");
      }
      setAddSalesmanLoading(false);
    }
  };

  return (
    <div>
      <CRow>
        <CModal color="danger" show={deleteModel} size="sm">
          {deleteErr && (
            <CAlert style={{ textAlign: "center" }} color="danger">
              {deleteErr}
            </CAlert>
          )}
          <CModalHeader closeButton>
            <CModalTitle>Delete Salesman</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete this salesman ?
          </CModalBody>
          {isLoading ? (
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
                onClick={() => deleteSalesman(deleteUserId)}
                color="danger"
              >
                Confirm
              </CButton>
              <CButton onClick={() => setDeleteModel(false)} color="secondary">
                Cancel
              </CButton>
            </CModalFooter>
          )}
        </CModal>
        <Formik
          initialValues={{
            name: "",
            contact: "",
            password: "",
          }}
          validationSchema={
            actionType &&
            Yup.object({
              name: Yup.string().required("Required"),
              contact: Yup.string()
                .required("Required")
                .matches(/^\d+$/, "Only digits are allowed")
                .min(11, "Contact length should be 11 digits")
                .max(11, "Contact length should be 11 digits"),

              password: Yup.string().required("Required"),
            })
          }
          onSubmit={(values, formikActions) => {
            addSalesman(values);
          }}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            values,
          }) => (
            <CModal
              show={addStockToggle}
              onClose={() => setAddStockToggle(false)}
            >
              {addSalesmanErr && (
                <CAlert style={{ textAlign: "center" }} color="danger">
                  {addSalesmanErr}
                </CAlert>
              )}
              <CModalHeader closeButton>
                <CModalTitle>
                  {actionType ? "Add Salesman" : "Update Salesman"}{" "}
                </CModalTitle>
              </CModalHeader>
              <CModalBody>
                <p className="model-text">
                  Enter the Required information of salesman
                </p>
                <CForm>
                  <CFormGroup>
                    <CLabel>Name</CLabel>
                    <CInput
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      placeholder="Enter Name.."
                    />
                    <CFormText className="help-block">
                      <p
                        style={{
                          color: errors.name && touched.name && "red",
                        }}
                      >
                        {errors.name && touched.name
                          ? errors.name
                          : "Please enter salesman name"}
                      </p>
                    </CFormText>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Contact</CLabel>
                    <CInput
                      onChange={handleChange("contact")}
                      onBlur={handleBlur("contact")}
                      value={values.contact}
                      placeholder="Enter Contact.."
                    />
                    <CFormText className="help-block">
                      <p
                        style={{
                          color: errors.contact && touched.contact && "red",
                        }}
                      >
                        {errors.contact && touched.contact
                          ? errors.contact
                          : "Please enter salesman contact"}
                      </p>
                    </CFormText>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="nf-password">Password</CLabel>
                    <CInput
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      placeholder="Enter Password.."
                    />
                    <CFormText className="help-block">
                      <p
                        style={{
                          color: errors.password && touched.password && "red",
                        }}
                      >
                        {errors.password && touched.password
                          ? errors.password
                          : "Please enter your password"}
                      </p>
                    </CFormText>
                  </CFormGroup>
                </CForm>
              </CModalBody>
              {addSalesmanLoading ? (
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
                  <CButton onClick={handleSubmit} color="primary">
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
          )}
        </Formik>
        {status == "loading" && isLoading && (
          <CCol
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            xl={12}
          >
            <CSpinner />
          </CCol>
        )}

        {status == "error" && (
          <CCol
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            xl={12}
          >
            <h1>Error while getting data</h1>
          </CCol>
        )}
        {status == "success" && !isLoading && (
          <CCol xl={12}>
            <CCard>
              <div className="header">
                <h3 className="header-txt">Salesman</h3>
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
                  items={data}
                  tableFilter
                  fields={[
                    { key: "_id", label: "ID", _classes: "font-weight-bold" },
                    { key: "name", label: "Name", _classes: "text-center" },
                    {
                      key: "contact",
                      label: "Contact",
                      _classes: "text-center",
                    },
                    { key: "role", label: "Role", _classes: "text-center" },
                    { key: "city", label: "City", _classes: "text-center" },
                    {
                      key: "password",
                      label: "Password",
                      _classes: "text-center",
                    },
                    {
                      key: "time_stamp",
                      label: "Registered",
                      _classes: "text-center",
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
                              size="sm"
                              color="info"
                              onClick={() => {
                                setActionType(null);
                                setUpdateUser(item);
                                setAddStockToggle(true);
                              }}
                            >
                              Update Salesman information
                            </CButton>
                            <CButton
                              onClick={() => {
                                setDeleteUserid(item?._id);
                                setDeleteModel(true);
                              }}
                              size="sm"
                              color="danger"
                              className="ml-1"
                            >
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
        )}
      </CRow>
    </div>
  );
};

export default Users;
