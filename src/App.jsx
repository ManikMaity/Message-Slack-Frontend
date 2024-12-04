import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {} from "react";
import { Route, Routes } from "react-router-dom";

import SigninContainer from "@/components/organisms/auth/SigninContainer";
import SignupContainer from "@/components/organisms/auth/SignupContainer";
import { Toaster } from "@/components/ui/toaster";
import Auth from "@/pages/auth/Auth";
import NotFound from "@/pages/NotFound";

import ForgetPasswordContainer from "./components/organisms/forgetPassword/ForgetPasswordContainer";
import ResetPasswordContainer from "./components/organisms/forgetPassword/ResetPasswordContainer";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/signup"
          element={
            <Auth>
              <SignupContainer />
            </Auth>
          }
        />
        <Route
          path="/signin"
          element={
            <Auth>
              <SigninContainer />
            </Auth>
          }
        />
        <Route path="/forgetPassword" element={<Auth><ForgetPasswordContainer/></Auth>} />
        <Route path="/reset-password/:token" element={<Auth><ResetPasswordContainer/></Auth>} />
        <Route path="/" element={<div>Home</div>} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
