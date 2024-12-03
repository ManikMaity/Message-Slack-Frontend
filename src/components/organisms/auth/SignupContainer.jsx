import { useState } from "react";

import Signup from "./Signup";

function SignupContainer() {
  const [signupFormData, setSignupFormData] = useState({
    usename: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [hidePassword, setHidePassword] = useState(true);

  return (
    <Signup
      setSignupFormData={setSignupFormData}
      signupFormData={signupFormData}
      hidePassword={hidePassword}
      setHidePassword={setHidePassword}
    />
  );
}

export default SignupContainer;
