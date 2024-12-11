import { AuthProvider } from "@/context/AuthContext";
import CombinedContext from "@/utils/CombinedContext";

const CombinedContextProvier = CombinedContext(AuthProvider);

function AppContextProvider({ children }) {
  return <CombinedContextProvier>{children}</CombinedContextProvier>;
}

export default AppContextProvider;
