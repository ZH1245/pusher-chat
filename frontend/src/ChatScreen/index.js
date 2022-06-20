import React, { useEffect, useState } from "react";

import "./index.css";
import Pusher from "pusher-js";
import axios from "axios";
function ChatScreen(props) {
  const [userID, setuserID] = useState(props.username ? props.username : "");
  const [roomId, setroomId] = useState(props.roomid ? props.roomid : "");
  const [receiver, setreceiver] = useState(
    props.receiver ? props.receiver : ""
  );
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    console.log("DOM FRESHED");
    const pusher = new Pusher("8446967bdc196e48bfbc", {
      cluster: "ap2",
      encrypted: true,
    });
    const channel = pusher.subscribe(roomId);
    channel.bind("message-received", (data) => {
      console.log(data, "pusher server");
      // // console.log("array", messages);
      // const newmessage = data;
      setMessages([...messages, data]);
      console.log("array", messages);
    });
    return () => {
      pusher.unsubscribe(roomId);
    };
  }, [messages]);

  const handleSenMessage = (e) => {
    e.preventDefault();
    // debugger;
    // const pusher = new Pusher({
    //   key: process.env.REACT_APP_key,
    //   cluster: process.env.REACT_APP_cluster,
    //   useTLS: true,
    // });
    // const channel = pusher.subscribe(userID);
    // channel.bind("message", (data) => {
    //   setMessages([...messages, data]);
    // });
    axios
      .post("http://localhost:4000/message", {
        from: userID,
        to: receiver,
        roomID: roomId,
        message: e.target.message.value,
      })
      .then((res) => {
        // console.log(res, "message received on server");
      })
      .catch((e) => console.log(e));
    // setMessages([...messages, e.target.message.value]);
  };
  return (
    <div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2>Welcome {userID}</h2>
      </div>
      <div className="container">
        {/* <div className="people">
          <h2>People</h2>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </div> */}
        {/* <div className="conversations"> */}
        <div>
          <div className="header">{"ROOM ID = " + roomId}</div>
          <div className="header">{"Chat with " + receiver}</div>
          <div className="message-container">
            {messages?.map((message, index) => {
              return (
                <div key={index}>
                  {userID == message.from ? (
                    <div className="to">
                      {message.message}
                      <br />
                    </div>
                  ) : (
                    <div className="from">
                      {message.message}
                      <br />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div
            style={{
              alignContent: "center",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <form onSubmit={handleSenMessage}>
              <input
                type={"text"}
                id="message"
                name="message"
                style={{ marginBottom: "20px" }}
              />
              <br />
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default ChatScreen;
