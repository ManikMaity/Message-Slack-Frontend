import { createContext, useState } from "react";

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
  const [mainSidebarOpen, setMainSidebarOpen] = useState(true);
  return (
    <SidebarContext.Provider value={{ mainSidebarOpen, setMainSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;

