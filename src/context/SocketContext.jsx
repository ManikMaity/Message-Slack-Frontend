import { BACKEND_SOCKET_URL } from "@/config/clientConfig";
import useChannelMessageContext from "@/hooks/apis/context/useChannelMessageContext";
import { createContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const { setChannelMessages, channelMessages } = useChannelMessageContext();

  const socket = io(BACKEND_SOCKET_URL, { transports: ["websocket"] });

  socket.on("NewMessageReceived", (data) => {
    console.log("Data rendererd");
    setChannelMessages((prev) => {
      return [...prev, data];
    });
  });

  socket.on("EditedMessageReceived", (data) => {
    console.log(data, "EditedMessageReceived");
    setChannelMessages((prev) =>
      prev.map((item) => {
        if (item._id === data._id) {
          return data;
        }
        return item;
      })
    );
  });

  socket.on("NewMessageLikeReceived", (data) => {
    console.log(data, "NewMessageLikeReceived");
    setChannelMessages((prev) =>
      prev.map((item) => {
        if (item._id === data._id) {
          return data;
        }
        return item;
      })
    );
    console.log(channelMessages, "NewMessageLikeReceived");
  });

  async function joinChannel({ channelId }) {
    socket.emit("JoinChannel", { channelId }, (data) => {
      console.log("Joined channel room");
      console.log(data);
      setCurrentChannel(data.data);
    });
  }

  async function leaveChannel({ channelId }) {
    socket.emit("LeaveChannel", { channelId }, (data) => {
      console.log(data);
    });
  }

  return (
    <SocketContext.Provider value={{ socket, joinChannel, currentChannel, leaveChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
