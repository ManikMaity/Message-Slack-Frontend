import { Route, Routes } from "react-router-dom";

import SigninContainer from "@/components/organisms/auth/SigninContainer";
import SignupContainer from "@/components/organisms/auth/SignupContainer";
import ForgetPasswordContainer from "@/components/organisms/forgetPassword/ForgetPasswordContainer";
import ResetPasswordContainer from "@/components/organisms/forgetPassword/ResetPasswordContainer";
import Auth from "@/pages/auth/Auth";
import NotFound from "@/pages/NotFound";
import Workspaces from "@/pages/workspace/Workspaces";

import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import Workspace from "./workspace/Workspace";
import JoinWorkspaceByCode from "./workspace/JoinWorkspaceByCode";

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
        <Route path="/workspace/:id" element={<Workspace/>}/>
        <Route path="/workspace/:id/channel/:channelId" element={<div>Channel</div>}/>
        <Route path="/workspace/join/:joinCode" element={<JoinWorkspaceByCode/>}/>
      </Route>
      <Route path="/" element={<Home/>} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
