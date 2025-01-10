import { BACKEND_SOCKET_URL } from "@/config/clientConfig";
import useChannelMessageContext from "@/hooks/apis/context/useChannelMessageContext";
import { createContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const { setChannelMessages } = useChannelMessageContext();

  const socket = io(BACKEND_SOCKET_URL, { transports: ["websocket"] });

  socket.on("NewMessageReceived", (data) => {
    console.log("Data rendererd");
    setChannelMessages((prev) => {
      return [...prev, data];
    });
  });

  socket.on("EditedMessageReceived", (data) => {
    console.log(data, "EditedMessageReceived");
    setChannelMessages((prev) => prev.map((item) => {
      if (item._id === data._id) {
        return data;
      }
      return item;
    }));
  });

  async function joinChannel({ channelId }) {
    socket.emit("JoinChannel", { channelId }, (data) => {
      console.log(data);
      setCurrentChannel(data.data);
    });
  }

  return (
    <SocketContext.Provider value={{ socket, joinChannel, currentChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
