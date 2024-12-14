import { useContext } from "react";

import AuthContext from "@/context/AuthContext";

function useAuthContext() {
  return useContext(AuthContext);
}

export default useAuthContext;
