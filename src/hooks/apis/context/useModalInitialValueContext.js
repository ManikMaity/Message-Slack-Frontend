import { useContext } from "react";

import ModalInitialValuesContext from "@/context/ModalInitialValuesContext";

function useModalInitialValueContext() {
  return useContext(ModalInitialValuesContext);
}

export default useModalInitialValueContext;
