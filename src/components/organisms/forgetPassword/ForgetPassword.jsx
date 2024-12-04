import { Loader2, LucideLoader2, TriangleAlert } from "lucide-react";
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

function ForgetPassword({email, setEmail, onSubmit, clientError, isPending, isError, isSuccess, error}) {
    return (
      <Card className="w-full h-full flex flex-col border-none shadow-none">
        <CardHeader>
          <CardTitle className="md:text-2xl">Forget Password</CardTitle>
          <CardDescription>
            {" "}
            Enter your email below to reset your password
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
                   Successfully sent reset password link to email. Check your email.
                  </p>
                </div>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  placeholder="manikmaity@gmail.com"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                  disabled={isPending}
                  size="lg"
                  type="submit"
                  className="w-full"
                >
                  {isPending && <Loader2 className="animate-spin" />}
                  Sent Reset Link
                </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Signup
            </Link>
          </div>
        </CardFooter>
      </Card>
    );
}

export default ForgetPassword;
