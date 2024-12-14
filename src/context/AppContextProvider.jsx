import { AuthProvider } from "@/context/AuthContext";
import CombinedContext from "@/utils/CombinedContext";

import { CreateWorkspaceProvider } from "./CreateWorkspaceContext";

const CombinedContextProvier = CombinedContext(AuthProvider, CreateWorkspaceProvider);

function AppContextProvider({ children }) {
  return <CombinedContextProvier>{children}</CombinedContextProvier>;
}

export default AppContextProvider;
