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

function Signup({
  signupFormData,
  setSignupFormData,
  hidePassword,
  setHidePassword,
}) {

  return (
    <Card className="w-full h-full flex flex-col border-none shadow-none">
      <CardHeader>
        <CardTitle className="md:text-2xl">Signup Form</CardTitle>
        <CardDescription>
          {" "}
          Enter your credentials below to create to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                placeholder="manikmaity"
                value={signupFormData.usename}
                required={true}
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
                    usename: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                placeholder="manikmaity@gmail.com"
                value={signupFormData.email}
                required={true}
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
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
                  value={signupFormData.password}
                  required={true}
                  onChange={(e) =>
                    setSignupFormData({
                      ...signupFormData,
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

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Confirm Password</Label>
              <Input
                type="password"
                id="ConfirmPassword"
                placeholder=""
                value={signupFormData.confirmPassword}
                required={true}
                onChange={(e) =>
                  setSignupFormData({
                    ...signupFormData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button disabled={false} size="lg" type="submit" className="w-full">
          Signup
        </Button>

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Signup;
