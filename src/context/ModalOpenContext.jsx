import { createContext, useState } from "react";

const ModalOpenContext = createContext(null);

export function ModalOpenProvider({ children }) {
  const [wsPreferenceModalOpen, setWsPreferenceModalOpen] = useState(false);

  return (
    <ModalOpenContext.Provider
      value={{ wsPreferenceModalOpen, setWsPreferenceModalOpen }}
    >
      {children}
    </ModalOpenContext.Provider>
  );
}

export default ModalOpenContext;
