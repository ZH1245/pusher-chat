import axios from "axios";
import React, { useState } from "react";
import ChatScreen from "../ChatScreen";
import "./index.css";
function Index() {
  const [isLoggedin, setLoggedIn] = useState(false);
  const [username, setusername] = useState(null);
  const [roomid, setroomid] = useState(null);
  const [receivername, setreceivername] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setusername(e.target.userid.value);
    setreceivername(e.target.receivername.value);

    await axios
      .post("http://localhost:4000/chatroom/init", {
        sender: e.target.userid.value,
        receiver: e.target.receivername.value,
      })
      .then((res) => {
        console.log(res.data);
        setroomid(res.data.roomID);
        setLoggedIn(true);
      })
      .catch((e) => console.log(e));
    console.log(e.target.userid.value);
  };
  return (
    <div>
      {!isLoggedin && (
        <div className="form-container">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="userid">Enter Username</label>
              <input
                type={"text"}
                id={"userid"}
                name="userid"
                aria-label="Enter Username"
              />
              <label htmlFor="roomid">Enter receiver Name</label>
              <input
                type={"text"}
                id={"receivername"}
                name="receivername"
                aria-label="Enter receivername"
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      {isLoggedin && (
        <div>
          <ChatScreen
            username={username}
            roomid={roomid}
            receiver={receivername}
          />
        </div>
      )}
    </div>
  );
}

export default Index;
