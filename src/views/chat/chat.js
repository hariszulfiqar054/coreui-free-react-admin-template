import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { ChatFeed, Message } from "react-chat-ui";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  CButton,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CAlert,
  CSpinner,
} from "@coreui/react";
import Env from "../../env/env";

const socket = io(Env.SOCKET_URL);
function Chat(props) {
  const user = useSelector((state) => state?.auth?.user);
  const [msg, setMsgs] = useState([]);
  const [typeMessage, setTypeMessage] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState({ isLoad: false, isError: "" });
  const [backendPages, setbackendPages] = useState(1);

  // Socket Handling
  useEffect(() => {
    if (socket) {
      socket.on("newMessage", ({ message, userId, name }) => {
        if (userId == user?._id) {
          setMsgs([...msg, { id: 0, message, senderName: name }]);
        } else setMsgs([...msg, { id: userId, message, senderName: name }]);
      });
    }
  }, [msg]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", user?.city);
    }
    return () => {
      if (socket) return socket.emit("leaveRoom", user?.city);
    };
  }, []);

  useEffect(() => {
    getMessages();
  }, [page]);

  const getMessages = async () => {
    setLoading({ ...isLoading, isLoad: true });
    try {
      const response = await axios.get(
        `chat/getChat?city=${user?.city}&page=${page}&limit=10`
      );
      console.log(response?.data);
      setbackendPages(response?.data?.total_pages);
      const parseData = response?.data?.data?.map((data) => {
        if (data?.user?._id == user?._id) {
          return { ...data, id: 0, senderName: data?.user?.name };
        } else return { ...data, senderName: data?.user?.name };
      });
      setMsgs([...msg, ...parseData]);
    } catch (error) {
      setLoading({ isLoad: false, isError: error });
      setTimeout(() => setLoading({ ...isLoading, isError: "" }), 3000);
    }
    setLoading({ ...isLoading, isLoad: false });
  };

  const onSendMessage = () => {
    if (typeMessage.length > 0) {
      if (socket) {
        socket.emit("chatRoomMessage", {
          chatroom: user?.city,
          message: typeMessage,
          userId: user?._id,
        });
        setTypeMessage("");
      }
    } else {
      setLoading({ ...isLoading, isError: "Empty Input" });
      setTimeout(() => setLoading({ ...isLoading, isError: "" }), 3000);
    }
  };

  const loadMore = () => {
    if (backendPages >= page + 1) {
      setPage(page + 1);
    } else return;
  };

  return (
    <div>
      {isLoading.isError.length > 0 ? (
        <CAlert className="text-center" color="danger">
          {isLoading.isError}
        </CAlert>
      ) : null}
      {isLoading.isLoad && msg.length == 0 ? (
        <div className="d-flex justify-content-center">
          <CSpinner />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="d-flex justify-content-center">
            <h2 className="mb-3">Region Conversation</h2>
          </div>
          {backendPages > page && (
            <div className="d-flex justify-content-center mb-3">
              <CButton color="primary" onClick={loadMore}>
                Load More
              </CButton>
            </div>
          )}
          <div className="bg-white">
            <ChatFeed
              messages={msg} // Array: list of message objects
              // Boolean: is the recipient typing
              maxHeight={600}
              showSenderName // show the name of the user who sent the message
              bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
              // JSON: Custom bubble

              bubbleStyles={{
                text: {
                  fontSize: 15,
                  fontWeight: "bold",
                },
                chatbubble: {
                  borderRadius: 70,
                  padding: 10,
                  margin: 5,
                },
              }}
            />
            <CInputGroup>
              <CInput
                style={{ fontSize: 18 }}
                placeholder="Type Message..."
                onChange={(e) => setTypeMessage(e.target.value)}
                value={typeMessage}
              />
              <CInputGroupAppend>
                <CButton
                  onClick={onSendMessage}
                  style={{ fontSize: 18 }}
                  color="success"
                >
                  Send
                </CButton>
              </CInputGroupAppend>
            </CInputGroup>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
