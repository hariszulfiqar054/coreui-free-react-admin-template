import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CCardHeader,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { AiFillPhone } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <Formik
                  initialValues={{
                    name: "",
                    contact: "",
                    password: "",
                    confirm_password: "",
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required("Required"),
                    contact: Yup.string()
                      .required("Required")
                      .matches(/^\d+$/, "Only digits are allowed")
                      .max(11, "Length should be 11 digit")
                      .min(11, "Length should be 11 digit"),
                    password: Yup.string()
                      .required("Required")
                      .min(5, "Password should be minimum lenght of 5"),
                    confirm_password: Yup.string().required("Required"),
                  })}
                  onSubmit={(values, formikActions) => {
                    formikActions.setSubmitting(false);
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
                    <CForm>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <AiFillPhone />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput placeholder="Contact" />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="new-password"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Repeat password"
                          autoComplete="new-password"
                        />
                      </CInputGroup>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "12px",
                        }}
                      >
                        <CDropdown style={{ alignSelf: "center" }}>
                          <CDropdownToggle color="info">
                            Select City
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem>Lahore</CDropdownItem>
                            <CDropdownItem>Karachi</CDropdownItem>
                            <CDropdownItem>Islamabad</CDropdownItem>
                            <CDropdownItem>Multan</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                      <CButton color="success" block>
                        Create Account
                      </CButton>
                    </CForm>
                  )}
                </Formik>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
