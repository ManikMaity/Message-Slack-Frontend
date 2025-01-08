import { AuthProvider } from "@/context/AuthContext";
import { CreateWorkspaceProvider } from "@/context/CreateWorkspaceContext";
import { ModalOpenProvider } from "@/context/ModalOpenContext";
import { SidebarProvider } from "@/context/SidebarContext";
import CombinedContext from "@/utils/CombinedContext";

import { ModalInitialValuesProvider } from "./ModalInitialValuesContext";
import { WorkspaceDataContextProvider } from "./WorkspaceDataContext";
import { SocketProvider } from "./SocketContext";
import { ChannelMessageProvider } from "./ChannelMessageContext";

const CombinedContextProvier = CombinedContext(
  ChannelMessageProvider,
  SocketProvider,
  AuthProvider,
  CreateWorkspaceProvider,
  SidebarProvider,
  ModalOpenProvider,
  ModalInitialValuesProvider,
  WorkspaceDataContextProvider,
);

function AppContextProvider({ children }) {
  return <CombinedContextProvier>{children}</CombinedContextProvier>;
}

export default AppContextProvider;
