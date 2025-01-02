import { BACKEND_SOCKET_URL } from "@/config/clientConfig";
import { createContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const socket = io(BACKEND_SOCKET_URL, { transports: ["websocket"] });


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
