import SocketContext from "@/context/SocketContext";
import { useContext } from "react";

function useSocketContext() {
  return useContext(SocketContext);
}

export default useSocketContext;
