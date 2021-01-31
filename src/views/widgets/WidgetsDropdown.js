import React from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";

const WidgetsDropdown = ({ data }) => {
  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{
            paddingBottom: "20px",
            fontSize: "20px",
          }}
          color="gradient-success"
          header={data?.data?.orders?.completed || "0"}
          text="Completed Orders"
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ paddingBottom: "20px", fontSize: "20px" }}
          color="gradient-info"
          header={data?.data?.orders?.accepted || "0"}
          text="Accepted Orders"
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ paddingBottom: "20px", fontSize: "20px" }}
          color="gradient-warning"
          header={data?.data?.orders?.pending || "0"}
          text="Pending Orders"
        />
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ paddingBottom: "20px", fontSize: "20px" }}
          color="gradient-danger"
          header={data?.data?.orders?.cancelled || "0"}
          text="Cancelled Orders"
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
