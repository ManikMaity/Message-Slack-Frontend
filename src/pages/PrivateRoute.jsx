import { Navigate, Outlet } from "react-router-dom";

import Spinner from "@/components/molecules/Spinner";
import useAuthContext from "@/hooks/apis/context/useAuthContext";
import { toast } from "@/hooks/use-toast";

function PrivateRoute() {
  const { auth } = useAuthContext();

  if (auth.loading) {
    return <div className="h-screen w-screen grid place-content-center"><Spinner/></div>;
  } else if (auth.user && auth.token) {
    return <Outlet />;
  } else {
    toast({
      description: "Please signin first to access your workspace.",
    });
    return <Navigate to="/signin" />;
  }
}

export default PrivateRoute;
