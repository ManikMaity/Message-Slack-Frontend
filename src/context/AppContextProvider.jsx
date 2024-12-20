import { AuthProvider } from "@/context/AuthContext";
import { CreateWorkspaceProvider } from "@/context/CreateWorkspaceContext";
import { ModalOpenProvider } from "@/context/ModalOpenContext";
import { SidebarProvider } from "@/context/SidebarContext";
import CombinedContext from "@/utils/CombinedContext";

import { ModalInitialValuesProvider } from "./ModalInitialValuesContext";
import { WorkspaceIdProvider } from "./WorkspaceIdContext";

const CombinedContextProvier = CombinedContext(
  AuthProvider,
  CreateWorkspaceProvider,
  SidebarProvider,
  ModalOpenProvider,
  ModalInitialValuesProvider,
  WorkspaceIdProvider
);

function AppContextProvider({ children }) {
  return <CombinedContextProvier>{children}</CombinedContextProvier>;
}

export default AppContextProvider;
