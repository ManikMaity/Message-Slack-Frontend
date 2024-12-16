import { AuthProvider } from "@/context/AuthContext";
import CombinedContext from "@/utils/CombinedContext";

import { CreateWorkspaceProvider } from "./CreateWorkspaceContext";
import { SidebarProvider } from "./SidebarContext";

const CombinedContextProvier = CombinedContext(AuthProvider, CreateWorkspaceProvider, SidebarProvider);

function AppContextProvider({ children }) {
  return <CombinedContextProvier>{children}</CombinedContextProvier>;
}

export default AppContextProvider;
