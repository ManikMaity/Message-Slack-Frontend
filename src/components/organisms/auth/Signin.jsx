import { Loader2, LucideLoader2, TriangleAlert } from "lucide-react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/utils/getErrorMessage";

function Signin({
  signinFormData,
  setSigninFormData,
  hidePassword,
  setHidePassword,
  signinError,
  handleSigninSubmit,
  signinBackendError,
  signinLoading,
  signinSuccess,
  isSigninError,
}) {
  return (
    <Card className="w-full h-full flex flex-col border-none shadow-none">
      <CardHeader>
        <CardTitle className="md:text-2xl">Signin Form</CardTitle>
        <CardDescription>
          {" "}
          Enter your credentials below to signin to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSigninSubmit}>
          <div className="grid w-full items-center gap-4">
            {signinError && (
              <div className="flex text-sm gap-2 items-center bg-red-500/15 p-3 rounded-lg">
                <TriangleAlert className="text-red-500 size-4" />
                <p>{signinError.message}</p>
              </div>
            )}

            {isSigninError && (
              <div className="flex text-sm gap-2 items-center bg-red-500/15 p-3 rounded-lg">
                <TriangleAlert className="text-red-500 size-4" />
                <p>{getErrorMessage(signinBackendError)}</p>
              </div>
            )}

            {signinSuccess && (
              <div className="flex text-sm gap-2 items-center bg-green-500/15 p-3 rounded-lg">
                <LucideLoader2 className="text-green-500 size-4 animate-spin" />
                <p>
                  Successfully signed in. You will be redirected to home page in
                  few seconds.
                </p>
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                placeholder="manikmaity@gmail.com"
                value={signinFormData.email}
                required={true}
                onChange={(e) =>
                  setSigninFormData({
                    ...signinFormData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <div className="flex gap-1">
                <Input
                  type={hidePassword ? "password" : "text"}
                  id="password"
                  placeholder="manikmaity"
                  value={signinFormData.password}
                  required={true}
                  onChange={(e) =>
                    setSigninFormData({
                      ...signinFormData,
                      password: e.target.value,
                    })
                  }
                />
                <Button
                  type="button"
                  onClick={() => setHidePassword(!hidePassword)}
                >
                  <AiOutlineEye />
                </Button>
              </div>
            </div>

            <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>

            <Button
                disabled={signinLoading}
                size="lg"
                type="submit"
                className="w-full"
              >
                {signinLoading && <Loader2 className="animate-spin" />}
                Continue
              </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Signin;
