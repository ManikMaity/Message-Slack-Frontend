import { createContext, useState } from "react";

const ModalOpenContext = createContext(null);

export function ModalOpenProvider({ children }) {
  
  const [wsPreferenceModalOpen, setWsPreferenceModalOpen] = useState(false);
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);
  const [workspaceLinkModalOpen, setWorkspaceLinkModalOpen] = useState(false);

  return (
    <ModalOpenContext.Provider
      value={{
        wsPreferenceModalOpen,
        setWsPreferenceModalOpen,
        createChannelModalOpen,
        setCreateChannelModalOpen,
        workspaceLinkModalOpen,
        setWorkspaceLinkModalOpen,
      }}
    >
      {children}
    </ModalOpenContext.Provider>
  );
}

export default ModalOpenContext;
