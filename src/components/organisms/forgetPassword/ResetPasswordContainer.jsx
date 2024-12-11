import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useResetPassword from "@/hooks/forgetPassword/useResetPassword";

import ResetPassword from "./ResetPassword";

function ResetPasswordContainer() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [clientError, setClientError] = useState(null);
  const { token } = useParams();
  const navigator = useNavigate();

  const { isError, error, isPending, isSuccess, resetPasswordMutateAsync } =
    useResetPassword();

  async function handleResetPasswordSubmit(e) {
    e.preventDefault();
    if (
      formData.password.trim() === "" ||
      formData.confirmPassword.trim() === ""
    ) {
      setClientError({ message: "Please fill all the fields" });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setClientError({ message: "Passwords do not match" });
      return;
    }
    await resetPasswordMutateAsync({
      hash: token,
      password: formData.password,
    });
  }

  useEffect(() => {
    if(isSuccess){
      setFormData({password: "", confirmPassword: ""});
      setClientError(null);
      setTimeout(() => {
        navigator("/signin");
      }, 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <ResetPassword
      formData={formData}
      hidePassword={hidePassword}
      setHidePassword={setHidePassword}
      setFormData={setFormData}
      onSubmit={handleResetPasswordSubmit}
      error={error}
      isError={isError}
      isPending={isPending}
      isSuccess={isSuccess}
      clientError={clientError}
    />
  );
}

export default ResetPasswordContainer;
