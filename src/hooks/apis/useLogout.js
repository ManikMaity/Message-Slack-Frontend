import { useNavigate } from "react-router-dom";

import useAuthContext from "@/hooks/apis/context/useAuthContext";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

function useLogout() {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function logoutFn() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("user");
    setAuth({
      token: null,
      user: null,
      loading: false,
    });
    toast({
      description : "You have successfully loged out."
    });
    queryClient.invalidateQueries(["workspaces"]);
    navigate("/signin");
  }

  return {
    logoutFn,
  };
}

export default useLogout;
