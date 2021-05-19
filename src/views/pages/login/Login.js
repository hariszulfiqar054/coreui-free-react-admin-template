import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner,
  CAlert,
  CValidFeedback,
  CModal,
  CInvalidFeedback,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Formik } from "formik";
import * as Yup from "yup";
import { AiFillPhone } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../../redux/actions/auth.action";
import { useHistory } from "react-router-dom";
import Roles from "../../../constants/roles";
import firebase from "../../../config/firebaseConfig";

const Login = () => {
  const history = useHistory();
  const [shared, setShared] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const [showForget, setShowForget] = useState(false);
  const [contact, setContact] = useState("+92");
  const [contactErr, setContactErr] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  const [fogetLoader, setForgetLoader] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

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
  const codeHandler = async () => {
    setForgetLoader(true);
    try {
      const codeResponse = await shared.confirm(code);
      if (codeResponse) {
        const response = await axios.post("user/forgetPassword", {
          contact: contact,
        });
        if (response?.data) {
          console.log(response?.data);
          if (response?.data?.data?.role == Roles.TEAM_LEADER) {
            dispatch(setUser(response.data?.data));
            dispatch(setToken(response?.data?.token));
            history.replace("/");
            setLoading(false);
          } else {
            showForget(false);
            setError("You are unauthorized");
          }
        }
      }
    } catch (error) {
      setCode("");
      setShowCode(false);
      setError("Invalid Verification Code");
      setTimeout(() => setError(""), 2000);
      setContact("+92");
      setShowForget(false);
    }
    setForgetLoader(false);
  };

  const loginHandler = async ({ contact, password }) => {
    setLoading(true);
    try {
      const response = await axios.post("user/login", { contact, password });
      if (response?.data) {
        if (response?.data?.data?.role == Roles.TEAM_LEADER) {
          dispatch(setUser(response.data?.data));
          dispatch(setToken(response?.data?.token));

          history.replace("/");

          setLoading(false);
        } else setError("You are unauthorized");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
    setLoading(false);
  };

  return (
    <div>
      {isError ? (
        <CAlert style={{ textAlign: "center" }} color="danger">
          {isError}
        </CAlert>
      ) : null}
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
              onClick={showCode ? codeHandler : onForgetHandler}
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
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <Formik
                      initialValues={{
                        contact: "+92",
                        password: "",
                      }}
                      validationSchema={Yup.object({
                        contact: Yup.string().required("Required"),

                        password: Yup.string().required("Required"),
                      })}
                      onSubmit={(values, formikActions) => {
                        loginHandler(values);
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
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <div className="mb-3">
                            <CInputGroup>
                              <CInputGroupPrepend>
                                <CInputGroupText>
                                  <AiFillPhone />
                                </CInputGroupText>
                              </CInputGroupPrepend>
                              <CInput
                                invalid={
                                  errors.contact && touched.contact
                                    ? true
                                    : false
                                }
                                valid={
                                  !errors.contact && touched.contact
                                    ? true
                                    : false
                                }
                                type="text"
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
                          <div className="mb-4">
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
                                autoComplete="current-password"
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
                          <CRow>
                            <CCol xs="6">
                              {isLoading ? (
                                <CSpinner color="primary" />
                              ) : (
                                <CButton
                                  onClick={handleSubmit}
                                  color="primary"
                                  className="px-4"
                                >
                                  Login
                                </CButton>
                              )}
                            </CCol>
                            <CCol xs="6" className="text-right">
                              <CButton
                                onClick={() => setShowForget(!showForget)}
                                color="link"
                                className="px-0"
                              >
                                Forgot password?
                              </CButton>
                            </CCol>
                          </CRow>
                        </CForm>
                      )}
                    </Formik>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
};

export default Login;
