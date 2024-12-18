import { useContext } from "react";

import ModalOpenContext from "@/context/ModalOpenContext";

function useModalOpenContext() {
  return useContext(ModalOpenContext);
}

export default useModalOpenContext;
