import { useState } from "react";

import Signin from "./Signin";

function SigninContainer() {
  const [signupFormData, setSignupFormData] = useState({
    email: "",
    password: "",
  });

  const [hidePassword, setHidePassword] = useState(true);

  return (
    <Signin
      setHidePassword={setHidePassword}
      hidePassword={hidePassword}
      setSignupFormData={setSignupFormData}
      signupFormData={signupFormData}
    />
  );
}

export default SigninContainer;
