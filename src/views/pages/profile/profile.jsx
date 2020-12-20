import React, { useState, useRef } from "react";
import "./profile.scss";
import {
  CCol,
  CInput,
  CRow,
  CInputGroup,
  CInputGroupText,
  CInputGroupPrepend,
  CButton,
  CAlert,
  CSpinner,
  CInputGroupAppend,
} from "@coreui/react";
import {
  AiFillPhone,
  RiUser3Fill,
  RiLockPasswordFill,
  FaEyeSlash,
  IoIosEye,
} from "react-icons/all";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updatePic, updateInfo } from "../../../redux/actions/auth.action";

function Profile(props) {
  const input = useRef();
  const user = useSelector((state) => state?.auth);
  const [uploadErr, setUploadErr] = useState("");
  const [uploadSuccess, setuploadSuccess] = useState("");
  const [username, setUserName] = useState(user?.user?.name);
  const [contact, setContact] = useState(user?.user?.contact);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [isLoading, setLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCPassword] = useState(false);

  const dispatch = useDispatch();

  // Image Upload Handler
  const updateProfilePic = async (img) => {
    try {
      const formBody = new FormData();
      formBody.append("img", img, img?.name);
      const response = await axios.put("user/updateProfile", formBody);
      if (response?.data?.success) {
        dispatch(updatePic(response?.data?.data?.img));
        setuploadSuccess("Profile Picture Updated Successfully");
        setTimeout(() => setuploadSuccess(""), 2000);
      } else {
        setUploadErr("Unable to upload profile picture");
        setTimeout(() => setUploadErr(""), 2000);
      }
    } catch (error) {
      setUploadErr(
        error?.response?.data?.message || "Unable to upload profile picture"
      );
      setTimeout(() => setUploadErr(""), 2000);
    }
  };

  // update user info
  const updateUserInfo = async () => {
    setLoading(true);
    if (password == cpassword) {
      try {
        const query = {};
        query.id = user?.user?._id;
        query.name = username;
        query.contact = contact;
        if (password) query.password = password;
        const response = await axios.put("user/updatesalesman", query);
        if (response?.data) {
          dispatch(updateInfo(response?.data?.data));
          setuploadSuccess("Information Updated Successfully");
          setTimeout(() => setuploadSuccess(""), 2000);
          setPassword("");
          setCpassword("");
        }
      } catch (error) {
        setUploadErr(
          error?.response?.data?.message || "Unable to update user information"
        );
      }
    } else {
      setUploadErr("Password Not Matched");
      setTimeout(() => setUploadErr(""), 2000);
    }
    setLoading(false);
  };

  return (
    <div>
      {uploadErr && (
        <CAlert style={{ textAlign: "center" }} color="danger">
          {uploadErr}
        </CAlert>
      )}
      {uploadSuccess && (
        <CAlert style={{ textAlign: "center" }} color="success">
          {uploadSuccess}
        </CAlert>
      )}
      <div onClick={() => input.current.click()} className="img-container">
        <input
          ref={input}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => updateProfilePic(e.target.files[0])}
        />
        <img
          className="profile-img"
          src={
            user?.user?.img ||
            "https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
          }
        />
      </div>
      <CRow className="mt-5 d-flex flex-column align-items-center">
        <CCol md={6} sm={2}>
          <CInputGroup className="mb-4">
            <CInputGroupPrepend>
              <CInputGroupText>
                <RiUser3Fill />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              value={username}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupPrepend>
              <CInputGroupText>
                <AiFillPhone />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type="text"
              placeholder="Contact"
              onChange={(e) => setContact(e.target.value)}
              value={contact}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupPrepend>
              <CInputGroupText>
                <RiLockPasswordFill />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <CInputGroupAppend>
              <CInputGroupText
                onClick={() => setShowPassword(!showPassword)}
                className={"bg-primary text-white"}
              >
                {showPassword ? <IoIosEye /> : <FaEyeSlash />}
              </CInputGroupText>
            </CInputGroupAppend>
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupPrepend>
              <CInputGroupText>
                <RiLockPasswordFill />
              </CInputGroupText>
            </CInputGroupPrepend>
            <CInput
              type={showCpassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setCpassword(e.target.value)}
              value={cpassword}
            />
            <CInputGroupAppend>
              <CInputGroupText
                onClick={() => setShowCPassword(!showCpassword)}
                className={"bg-primary text-white"}
              >
                {showCpassword ? <IoIosEye /> : <FaEyeSlash />}
              </CInputGroupText>
            </CInputGroupAppend>
          </CInputGroup>
        </CCol>
        {isLoading ? (
          <CSpinner />
        ) : (
          <CButton
            onClick={updateUserInfo}
            style={{ width: "10%" }}
            color="primary"
          >
            Update
          </CButton>
        )}
      </CRow>
    </div>
  );
}

export default Profile;
