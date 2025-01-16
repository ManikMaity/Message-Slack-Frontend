import { Route, Routes } from "react-router-dom";

import SigninContainer from "@/components/organisms/auth/SigninContainer";
import SignupContainer from "@/components/organisms/auth/SignupContainer";
import ChannelLayout from "@/components/organisms/Channel/ChannelLayout";
import ForgetPasswordContainer from "@/components/organisms/forgetPassword/ForgetPasswordContainer";
import ResetPasswordContainer from "@/components/organisms/forgetPassword/ResetPasswordContainer";
import Auth from "@/pages/auth/Auth";
import NotFound from "@/pages/NotFound";
import Workspaces from "@/pages/workspace/Workspaces";

import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import VerifyUserEmail from "./user/VerifyUserEmail";
import JoinWorkspaceByCode from "./workspace/JoinWorkspaceByCode";
import WorkSpaceLayout from "./workspace/Layout";
import MemberLayout from "@/components/organisms/Member/MemberLayout";
import Payment from "./payment/Payment";

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
      <Route path="/verifyemail/:hash" element={<VerifyUserEmail />} />
      <Route element={<PrivateRoute />}>
      <Route path="/workspace/:id/subscribe" element={<WorkSpaceLayout><Payment /></WorkSpaceLayout>} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route
          path="/workspace/:id"
          element={<WorkSpaceLayout>Workspace</WorkSpaceLayout>}
        />
        <Route
          path="/workspace/:id/channel/:channelId"
          element={
            <WorkSpaceLayout>
              <ChannelLayout />
            </WorkSpaceLayout>
          }
        />
        <Route path="/workspace/:id/member/:memberId"
          element={<WorkSpaceLayout><MemberLayout/></WorkSpaceLayout>}
          />
        <Route
          path="/workspace/join/:joinCode"
          element={<JoinWorkspaceByCode />}
        />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
