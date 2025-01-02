import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useSignin from "@/hooks/apis/auth/useSignin";

import Signin from "./Signin";

function SigninContainer() {
  const [signinFormData, setSigninFormData] = useState({
    email: "",
    password: "",
  });
  const [signinError, setSigninError] = useState(null);

  const navigator = useNavigate();

  const { signinMutateAsync, isError, isLoading, isSuccess, error } =
    useSignin();

  const [hidePassword, setHidePassword] = useState(true);

  async function handleSigninSubmit(e) {
    e.preventDefault();

    if (
      signinFormData.email.trim() === "" ||
      signinFormData.password.trim() === ""
    ) {
      setSigninError({ message: "Please fill all the fields" });
      return;
    }

    setSigninError(null);

    await signinMutateAsync({
      email: signinFormData.email,
      password: signinFormData.password,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setSigninFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigator("/workspaces");
      }, 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Signin
      setHidePassword={setHidePassword}
      hidePassword={hidePassword}
      setSigninFormData={setSigninFormData}
      signinFormData={signinFormData}
      handleSigninSubmit={handleSigninSubmit}
      signinError={signinError}
      signinBackendError={error}
      signinLoading={isLoading}
      signinSuccess={isSuccess}
      isSigninError={isError}
    />
  );
}

export default SigninContainer;
