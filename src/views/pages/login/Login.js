import React, { useState } from "react";
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
  CInvalidFeedback,
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

const Login = () => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  const dispatch = useDispatch();

  const loginHandler = async ({ contact, password }) => {
    setLoading(true);
    try {
      const response = await axios.post("user/login", { contact, password });
      if (response?.data) {
        dispatch(setUser(response.data?.data));
        dispatch(setToken(response?.data?.token));

        setLoading(false);
        if (response?.data?.data?.role == Roles.TEAM_LEADER)
          history.replace("/");
        else setError("You are unauthorized");
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
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <Formik
                      initialValues={{
                        contact: "",
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
                              <CButton color="link" className="px-0">
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
