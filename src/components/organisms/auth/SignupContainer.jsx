import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useSignup from "@/hooks/apis/auth/useSignup";

import Signup from "./Signup";

function SignupContainer() {
  const [signupFormData, setSignupFormData] = useState({
    usename: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigator = useNavigate();

  const [signupError, setSignupError] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);

  const { signupMutateAsync, isLoading, error, isSuccess } = useSignup();

  async function handleSighupClick(e) {
    e.preventDefault();
    if (
      signupFormData.email.trim() === "" ||
      signupFormData.usename.trim() === "" ||
      signupFormData.password.trim() === "" ||
      signupFormData.confirmPassword.trim() === ""
    ) {
      setSignupError({ message: "Please fill all the fields" });
      return;
    }

    if (signupFormData.password !== signupFormData.confirmPassword) {
      setSignupError({ message: "Passwords do not match" });
      return;
    }

    setSignupError(null);
    await signupMutateAsync({
      username: signupFormData.usename,
      email: signupFormData.email,
      password: signupFormData.password,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setSignupFormData({
        usename: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigator("/signin");
      }, 3000);
    }
  }, [isSuccess, navigator]);
 

  return (
    <Signup
      isSignupLoading={isLoading}
      signupErrorBackend={error}
      signupSuccess={isSuccess}
      onSignupFormSubmit={handleSighupClick}
      setSignupFormData={setSignupFormData}
      signupFormData={signupFormData}
      hidePassword={hidePassword}
      setHidePassword={setHidePassword}
      signupError={signupError}
    />
  );
}

export default SignupContainer;
