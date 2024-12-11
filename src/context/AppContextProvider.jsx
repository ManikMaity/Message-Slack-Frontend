import CombinedContext from "@/utils/CombinedContext";
import { AuthProvider } from "@/context/AuthContext";

const CombinedContextProvier = CombinedContext(AuthProvider);

function AppContextProvider({ children }) {
  return <CombinedContextProvier>{children}</CombinedContextProvier>;
}

export default AppContextProvider;
