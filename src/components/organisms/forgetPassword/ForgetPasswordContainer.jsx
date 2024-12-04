import { useState } from "react";

import useFogetPassword from "@/hooks/forgetPassword/useFogetPassword";

import ForgetPassword from "./ForgetPassword";

function ForgetPasswordContainer() {
  const [email, setEmail] = useState("");
  const [clientError, setClientError] = useState(null);

  const { forgetPasswordMutateAsync, isPending, isError, isSuccess, error } =
    useFogetPassword();

  async function handleForgetPassowrdSubmit(e) {
    e.preventDefault();

    if (email.trim() === "") {
      setClientError({
        message: "Please fill email field",
      });
      return;
    }

    setClientError(null);
    await forgetPasswordMutateAsync(email);
  }

  return (
    <ForgetPassword
      setEmail={setEmail}
      email={email}
      isPending={isPending}
      isError={isError}
      isSuccess={isSuccess}
      onSubmit={handleForgetPassowrdSubmit}
      error={error}
      clientError={clientError}
    />
  );
}

export default ForgetPasswordContainer;
