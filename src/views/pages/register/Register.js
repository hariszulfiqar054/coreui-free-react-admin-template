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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CValidFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { AiFillPhone } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import firebase from "../../../config/firebaseConfig";

const Register = () => {
  const history = useHistory();
  const [city, setCity] = useState(null);
  const [isSubmittedPress, setIsSubmittedPressed] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [contact, setContact] = useState("+92");
  const [contactErr, setContactErr] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  const [fogetLoader, setForgetLoader] = useState(false);
  const [shared, setShared] = useState(null);
  const [showForget, setShowForget] = useState(false);
  const [formvalues, setFormValues] = useState(null);

  const signupHandler = async ({ name, contact, password }) => {
    setLoading(true);
    setForgetLoader(true);
    try {
      const codeResponse = await shared.confirm(code);
      if (codeResponse) {
        const response = await axios.post("user/teamleaderSignup", {
          name: name ? name : formvalues?.name,
          contact: contact ? contact : formvalues?.contact,
          password: password ? password : formvalues?.password,
          city,
        });
        if (response?.data) {
          setShowForget(false);
          setLoading(false);
          setError("Sign Up Sucess");
          setTimeout(() => {
            setError("");
            history.push("/login");
          }, 2000);
        }
      }
    } catch (error) {
      setError(error?.response?.data?.message);
      setCode("");
      setShowCode(false);
      setError("Invalid Verification Code");
      setTimeout(() => setError(""), 2000);
      setContact("+92");
      setShowForget(false);
    }
    setLoading(false);
    setForgetLoader(false);
  };

  const onForgetHandler = async () => {
    if (contact?.length > 3) {
      try {
        const recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha", {
          size: "invisible",
        });
        const firebaseRes = await firebase
          .auth()
          .signInWithPhoneNumber(contact, recaptcha);
        if (firebaseRes) {
          setShowCode(true);
          setShared(firebaseRes);
        }
      } catch (error) {
        setContact("+92");
        setContactErr(error?.message);
        setTimeout(() => setContactErr(""), 2000);
      }
    } else {
      setContactErr("Please Enter The Valid Contact Number");
      setTimeout(() => setContactErr(""), 2000);
    }
  };

  return (
    <div>
      {isSubmittedPress && (
        <CAlert style={{ textAlign: "center" }} color="danger">
          Select the City
        </CAlert>
      )}
      {isError && (
        <CAlert
          style={{ textAlign: "center" }}
          color={isError?.includes("Sign Up Sucess") ? "success" : "danger"}
        >
          {isError}
        </CAlert>
      )}

      <CModal color="primary" show={showForget} size="md">
        <CModalHeader closeButton>
          <CModalTitle>
            {showCode ? "Verification Code" : "Account Recovery"}
          </CModalTitle>
        </CModalHeader>
        {contactErr && (
          <CAlert style={{ textAlign: "center" }} color="danger">
            {contactErr}
          </CAlert>
        )}
        <CModalBody>
          <CInputGroup>
            <CInputGroupPrepend>
              <CInputGroupText>
                {showCode ? <CIcon name="cil-lock-locked" /> : <AiFillPhone />}
              </CInputGroupText>
            </CInputGroupPrepend>
            {showCode ? (
              <CInput
                placeholder="Enter Your Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            ) : (
              <CInput
                placeholder="Enter Your Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            )}
          </CInputGroup>
        </CModalBody>
        {fogetLoader ? (
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
              onClick={showCode ? signupHandler : onForgetHandler}
              color="primary"
            >
              Confirm
            </CButton>
            <CButton onClick={() => setShowForget(false)} color="secondary">
              Cancel
            </CButton>
          </CModalFooter>
        )}
      </CModal>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <Formik
                    initialValues={{
                      name: "",
                      contact: "+92",
                      password: "",
                      confirm_password: "",
                    }}
                    validationSchema={Yup.object({
                      name: Yup.string().required("Required"),
                      contact: Yup.string()
                        .required("Required")
                        .matches(/^[\d ()+]+$/, "Only digits are allowed")
                        .min(13, "Contact length should be 11 digits")
                        .max(13, "Contact length should be 11 digits"),

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
                        setFormValues(values);
                        setShowForget(!showForget);
                        setContact(values.contact);
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
                        <div id="recaptcha"></div>
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
