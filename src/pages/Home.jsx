import { Navigate } from "react-router-dom";

import useAuthContext from "@/hooks/apis/context/useAuthContext";
import { toast } from "@/hooks/use-toast";
import JumpLoader from "@/components/atoms/Loader/JumpLoader";

function Home() {
  const { auth } = useAuthContext();

  if (auth.loading) {
    return <div className="h-screen w-screen grid place-content-center"><JumpLoader/></div>;
  } else if (auth.user && auth.token) {
    return <Navigate to="/workspaces" />;
  } else {
    toast({
      description: "Please signin first to access your workspace.",
    });
    return <Navigate to="/signin" />;
  }
}

export default Home;
