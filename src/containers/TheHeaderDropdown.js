import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { logoutUser } from "../redux/actions/auth.action";
import { setCurrentItem } from "../redux/actions/stock.action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const TheHeaderDropdown = () => {
  const user = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={
              user?.user?.img ||
              "https://png.pngitem.com/pimgs/s/130-1300400_user-hd-png-download.png"
            }
            className="c-avatar-img"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => history.push("profile")}>
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem divider />
        <CDropdownItem
          onClick={() => {
            dispatch(setCurrentItem(null));
            dispatch(logoutUser());
          }}
        >
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
