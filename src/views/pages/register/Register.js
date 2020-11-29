import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CAlert,
  CSpinner,
  CInvalidFeedback,
  CValidFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { AiFillPhone } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [city, setCity] = useState(null);
  const [isSubmittedPress, setIsSubmittedPressed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  const signupHandler = async ({ name, contact, password }) => {
    setLoading(true);
    try {
      const response = await axios.post("user/teamleaderSignup", {
        name,
        contact,
        password,
        city,
      });
      if (response?.data) {
        setLoading(false);
        history.push("/login");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <div>
      {isSubmittedPress && (
        <CAlert style={{ textAlign: "center" }} color="danger">
          Select the City
        </CAlert>
      )}
      {isError && (
        <CAlert style={{ textAlign: "center" }} color="danger">
          {isError}
        </CAlert>
      )}

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
                      city
                        ? setIsSubmittedPressed(false)
                        : setIsSubmittedPressed(true);
                      if (city) {
                        signupHandler(values);
                      }
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
                        <div className="mb-3">
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              invalid={
                                errors.name && touched.name ? true : false
                              }
                              valid={
                                !errors.name && touched.name ? true : false
                              }
                              type="text"
                              placeholder="Username"
                              onChange={handleChange("name")}
                              onBlur={handleBlur("name")}
                              value={values.name}
                            />
                            <CValidFeedback></CValidFeedback>
                            <CInvalidFeedback>{errors.name}</CInvalidFeedback>
                          </CInputGroup>
                        </div>
                        <div className="mb-3">
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <AiFillPhone />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              invalid={
                                errors.contact && touched.contact ? true : false
                              }
                              valid={
                                !errors.contact && touched.contact
                                  ? true
                                  : false
                              }
                              placeholder="Contact"
                              onChange={handleChange("contact")}
                              onBlur={handleBlur("contact")}
                              value={values.contact}
                            />
                            <CValidFeedback></CValidFeedback>
                            <CInvalidFeedback>
                              {errors.contact}
                            </CInvalidFeedback>
                          </CInputGroup>
                        </div>
                        <div className="mb-3">
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              invalid={
                                errors.password && touched.password
                                  ? true
                                  : false
                              }
                              valid={
                                !errors.password && touched.password
                                  ? true
                                  : false
                              }
                              type="password"
                              placeholder="Password"
                              onChange={handleChange("password")}
                              onBlur={handleBlur("password")}
                              value={values.password}
                            />

                            <CValidFeedback></CValidFeedback>
                            <CInvalidFeedback>
                              {errors.password}
                            </CInvalidFeedback>
                          </CInputGroup>
                        </div>
                        <div className="mb-4">
                          <CInputGroup>
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              invalid={
                                (errors.confirm_password &&
                                  touched.confirm_password) ||
                                (values.password !== values.confirm_password &&
                                  values.password.length > 0 &&
                                  values.confirm_password.length > 0)
                                  ? true
                                  : false
                              }
                              valid={
                                (!errors.confirm_password &&
                                  touched.confirm_password) ||
                                (values.password === values.confirm_password &&
                                  values.password.length > 0 &&
                                  values.confirm_password.length > 0)
                                  ? true
                                  : false
                              }
                              type="password"
                              placeholder="Repeat password"
                              onChange={handleChange("confirm_password")}
                              onBlur={handleBlur("confirm_password")}
                              value={values.confirm_password}
                            />

                            <CValidFeedback></CValidFeedback>
                            <CInvalidFeedback>
                              {(errors.confirm_password &&
                                touched.confirm_password) ||
                                (values.password !== values.confirm_password
                                  ? "Password Not Matched"
                                  : "Required")}
                            </CInvalidFeedback>
                          </CInputGroup>
                          {/* {(errors.confirm_password &&
                            touched.confirm_password) ||
                          values.password !== values.confirm_password ? (
                            <p style={{ color: "red" }}>Password not matched</p>
                          ) : null} */}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "12px",
                          }}
                        >
                          <CDropdown style={{ alignSelf: "center" }}>
                            <CDropdownToggle color="info">
                              {city ? city : "Select City"}
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem onClick={() => setCity("Lahore")}>
                                Lahore
                              </CDropdownItem>
                              <CDropdownItem onClick={() => setCity("Karachi")}>
                                Karachi
                              </CDropdownItem>
                              <CDropdownItem
                                onClick={() => setCity("Islamabad")}
                              >
                                Islamabad
                              </CDropdownItem>
                              <CDropdownItem onClick={() => setCity("Multan")}>
                                Multan
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </div>
                        {isLoading ? (
                          <CSpinner
                            style={{ display: "flex", alignSelf: "center" }}
                            color="primary"
                          />
                        ) : (
                          <CButton onClick={handleSubmit} color="success" block>
                            Create Account
                          </CButton>
                        )}
                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default Register;
