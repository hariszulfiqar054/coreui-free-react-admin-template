import React, { useState, useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CPagination,
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
  CInput,
  CSpinner,
  CAlert,
} from "@coreui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { usePaginatedQuery } from "react-query";
import "./announcements.scss";

const Announcements = () => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [actionType, setActionType] = useState(null);
  const [page, setPage] = useState(currentPage);
  const [addLoading, setaddLoading] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(0);
  const [announceTxt, setAnnounceTxt] = useState(null);
  const [addAnnErr, setAddAnnErr] = useState(null);
  const [currAnn, setCurrAnn] = useState(null);
  const [delErr, setDelErr] = useState(null);
  const [delModel, setDelModel] = useState(false);
  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/announcements?page=${newPage}`);
  };
  const [addStockToggle, setAddStockToggle] = useState(false);
  const city = useSelector((state) => state?.auth?.user?.city);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  //Get Announcements
  const getAnnouncement = async () => {
    const response = await axios.get(
      `announcements/getannouncements/${city}?page=${page}&limit=10`
    );

    return response?.data;
  };

  const { status, resolvedData, refetch } = usePaginatedQuery(
    ["announcement", page],
    getAnnouncement
  );

  //Add Announcements
  const addAnnouncement = async () => {
    setaddLoading(true);
    try {
      const response = await axios.post("announcements/new_announcement", {
        text: announceTxt,
      });
      if (response?.data) {
        setAddStockToggle(false);
        refetch();
      }
    } catch (error) {
      setAddAnnErr("Error while adding announcement.");
    }
    setaddLoading(false);
  };

  //Delete Announcement
  const deleteAnnouncement = async () => {
    setaddLoading(true);
    try {
      const response = await axios.delete("announcements/deleteannouncement", {
        data: { id: currAnn },
      });
      if (response?.data) {
        setAnnounceTxt("");
        setDelModel(false);
        refetch();
      }
    } catch (error) {
      setDelErr("Error while deleting announcement");
    }
    setaddLoading(false);
  };

  //Update Announcement
  const updateAnnouncement = async () => {
    setaddLoading(true);
    try {
      const response = await axios.put("announcements/updateannouncement", {
        id: currAnn,
        text: announceTxt,
      });
      if (response?.data) {
        setAnnounceTxt("");
        refetch();
        setAddStockToggle(false);
      }
    } catch (error) {
      setDelErr("Error while updating announcement");
    }
    setaddLoading(false);
  };

  return (
    <div>
      <CRow>
        <CModal color="danger" show={delModel} size="sm">
          {delErr && (
            <CAlert style={{ textAlign: "center" }} color="danger">
              {delErr}
            </CAlert>
          )}
          <CModalHeader closeButton>
            <CModalTitle>Delete Announcement</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete this Announcement ?
          </CModalBody>
          {addLoading ? (
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
              <CButton onClick={deleteAnnouncement} color="danger">
                Confirm
              </CButton>
              <CButton onClick={() => setDelModel(false)} color="secondary">
                Cancel
              </CButton>
            </CModalFooter>
          )}
        </CModal>
        <CModal show={addStockToggle} onClose={() => setAddStockToggle(false)}>
          {addAnnErr && (
            <CAlert style={{ textAlign: "center" }} color="danger">
              {addAnnErr}
            </CAlert>
          )}
          <CModalHeader closeButton>
            <CModalTitle>
              {actionType == "add" ? "Add Announcement" : "Update Announcement"}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <CFormGroup>
                <p className="model-text">Enter the required fields</p>
                <CInput
                  value={announceTxt}
                  onChange={(e) => setAnnounceTxt(e.target.value)}
                  placeholder="Enter Announcement.."
                />
                <CFormText className="help-block">
                  Please enter announcement text
                </CFormText>
              </CFormGroup>
            </CForm>
          </CModalBody>
          {addLoading ? (
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
                onClick={() =>
                  announceTxt?.length > 0
                    ? actionType == "add"
                      ? addAnnouncement()
                      : updateAnnouncement()
                    : setAddAnnErr("Field is empty!")
                }
                color="primary"
              >
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

        {status == "error" && (
          <CCol
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            xl={12}
          >
            <h1>Error while getting data</h1>
          </CCol>
        )}
        {status == "loading" && (
          <CCol
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            xl={12}
          >
            <CSpinner />
          </CCol>
        )}

        {status == "success" && (
          <CCol xl={12}>
            <CCard>
              <div className="header">
                <h3 className="header-txt">Announcements</h3>

                <CButton
                  onClick={() => {
                    setAddStockToggle(true);
                    setActionType("add");
                  }}
                >
                  <HiOutlinePlus size={30} />
                </CButton>
              </div>
              <hr />
              <CCardBody>
                <CDataTable
                  items={resolvedData?.data}
                  tableFilter
                  fields={[
                    { key: "_id", _classes: "font-weight-bold text-center" },
                    {
                      key: "text",
                      label: "Announcement",
                      _classes: "text-center",
                    },
                    {
                      key: "time_stamp",
                      label: "Date",
                      _classes: "text-center",
                    },
                    { key: "city", label: "City", _classes: "text-center" },

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
                  itemsPerPage={resolvedData?.data?.length}
                  activePage={page}
                  pagination
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
                              onClick={() => {
                                setActionType(null);
                                setAddStockToggle(true);
                                setCurrAnn(item?._id);
                              }}
                              size="sm"
                              color="info"
                            >
                              Update Announcement
                            </CButton>
                            <CButton
                              onClick={() => {
                                setCurrAnn(item?._id);
                                setDelModel(true);
                              }}
                              size="sm"
                              color="danger"
                              className="ml-1"
                            >
                              Delete Announcement
                            </CButton>
                          </CCardBody>
                        </CCollapse>
                      );
                    },
                  }}
                />
                <CPagination
                  activePage={page}
                  onActivePageChange={pageChange}
                  pages={resolvedData?.total_pages}
                  doubleArrows={false}
                  align="center"
                />
              </CCardBody>
            </CCard>
          </CCol>
        )}
      </CRow>
    </div>
  );
};

export default Announcements;
