import { Route, Routes } from "react-router-dom";

import SigninContainer from "@/components/organisms/auth/SigninContainer";
import SignupContainer from "@/components/organisms/auth/SignupContainer";
import ForgetPasswordContainer from "@/components/organisms/forgetPassword/ForgetPasswordContainer";
import ResetPasswordContainer from "@/components/organisms/forgetPassword/ResetPasswordContainer";
import Auth from "@/pages/auth/Auth";
import NotFound from "@/pages/NotFound";
import Workspaces from "@/pages/Workspaces";
import PrivateRoute from "./PrivateRoute";

export function AppRoutes() {
  return (
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
      <Route
        path="/forgetPassword"
        element={
          <Auth>
            <ForgetPasswordContainer />
          </Auth>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <Auth>
            <ResetPasswordContainer />
          </Auth>
        }
      />
      <Route element={<PrivateRoute />}>
        <Route path="/workspaces" element={<Workspaces />} />
      </Route>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
