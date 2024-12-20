import { createContext, useState } from "react";

const ModalInitialValuesContext = createContext(null);

export function ModalInitialValuesProvider({ children }) {
  
  const [workspacePreferencesVlaue, setWorkspacePreferencesVlaue] = useState({});

  return (
    <ModalInitialValuesContext.Provider
      value={{ workspacePreferencesVlaue, setWorkspacePreferencesVlaue }}
    >
      {children}
    </ModalInitialValuesContext.Provider>
  );
}

export default ModalInitialValuesContext;
