import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

function useAuthContext() {
  return useContext(AuthContext);
}

export default useAuthContext;
