import { useState } from "react";
import ResetPassword from "./ResetPassword";

function ResetPasswordContainer() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <ResetPassword
      formData={formData}
      hidePassword={hidePassword}
      setHidePassword={setHidePassword}
      setFormData={setFormData}
    />
  );
}

export default ResetPasswordContainer;
