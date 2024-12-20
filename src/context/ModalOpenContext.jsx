import { createContext, useState } from "react";

const ModalOpenContext = createContext(null);

export function ModalOpenProvider({ children }) {

  const [wsPreferenceModalOpen, setWsPreferenceModalOpen] = useState(false);
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(true);

  return (
    <ModalOpenContext.Provider
      value={{ wsPreferenceModalOpen, setWsPreferenceModalOpen, createChannelModalOpen, setCreateChannelModalOpen }}
    >
      {children}
    </ModalOpenContext.Provider>
  );
}

export default ModalOpenContext;
