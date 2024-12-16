import { useContext } from "react";

import SidebarContext from "@/context/SidebarContext";

function useSidebarContext() {
  return useContext(SidebarContext);
}

export default useSidebarContext;
