import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { ChatFeed, Message } from "react-chat-ui";
import { useSelector } from "react-redux";
import { CButton, CInput, CInputGroup, CInputGroupAppend } from "@coreui/react";

function Chat(props) {
  const user = useSelector((state) => state?.auth?.user);

  const [msg, setMsgs] = useState([
    new Message({
      id: 1,
      message: "I'm the recipient! (The person you're talking to)",
    }), // Gray bubble
    new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
  ]);
  useEffect(() => {
    const socket = io("http://localhost:6001");
    socket.on("connecto", () => console.log("socket connected"));
    return () => socket.emit("disconnect");
  }, []);
  // console.log(socket);
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-center">
        <h2 className="mb-3">Region Conversation</h2>
      </div>
      <div className="bg-white">
        <ChatFeed
          messages={msg} // Array: list of message objects
          // Boolean: is the recipient typing
          maxHeight={700}
          showSenderName // show the name of the user who sent the message
          bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
          // JSON: Custom bubble

          bubbleStyles={{
            text: {
              fontSize: 14,
            },
            chatbubble: {
              borderRadius: 70,
              padding: 10,
              margin: 5,
            },
          }}
        />
        <CInputGroup>
          <CInput style={{ fontSize: 18 }} placeholder="Type Message..." />
          <CInputGroupAppend>
            <CButton style={{ fontSize: 18 }} color="success">
              Send
            </CButton>
          </CInputGroupAppend>
        </CInputGroup>
      </div>
    </div>
  );
}

export default Chat;
