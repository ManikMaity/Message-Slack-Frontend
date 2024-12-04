import { Loader2, LucideLoader2, TriangleAlert } from "lucide-react";
import { AiOutlineEye } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/utils/getErrorMessage";

function ResetPassword({formData, setFormData, hidePassword, setHidePassword, onSubmit, clientError, isPending, isError, isSuccess, error}) {
    return (
      <Card className="w-full h-full flex flex-col border-none shadow-none">
        <CardHeader>
          <CardTitle className="md:text-2xl">Reset Password</CardTitle>
          <CardDescription>
            {" "}
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
              {clientError && (
                <div className="flex text-sm gap-2 items-center bg-red-500/15 p-3 rounded-lg">
                  <TriangleAlert className="text-red-500 size-4" />
                  <p>{clientError.message}</p>
                </div>
              )}
  
              {isError && (
                <div className="flex text-sm gap-2 items-center bg-red-500/15 p-3 rounded-lg">
                  <TriangleAlert className="text-red-500 size-4" />
                  <p>{getErrorMessage(error)}</p>
                </div>
              )}
  
              {isSuccess && (
                <div className="flex text-sm gap-2 items-center bg-green-500/15 p-3 rounded-lg">
                  <LucideLoader2 className="text-green-500 size-4 animate-spin" />
                  <p>
                    Password reset successfully, Redirecting to signin page
                  </p>
                </div>
              )}
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <div className="flex gap-1">
                <Input
                  type={hidePassword ? "password" : "text"}
                  id="password"
                  placeholder="manikmaity"
                  value={formData.password}
                  required={true}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
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
                value={formData.confirmPassword}
                required={true}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
              <Button
                  disabled={isPending}
                  size="lg"
                  type="submit"
                  className="w-full"
                >
                  {isPending && <Loader2 className="animate-spin" />}
                  Reset Password
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
}

export default ResetPassword;
