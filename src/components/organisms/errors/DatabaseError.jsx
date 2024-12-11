
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DatabaseError({errorTitle, errorMessage, onClickFn = () => {console.log("clicked");}}) {
  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-red-500 text-2xl font-bold">{errorTitle || "Server Error"}</CardTitle>
        <CardDescription>{errorMessage || "An unespected error has occured."}</CardDescription>
      </CardHeader>
      <CardFooter className="">
        <Button className="w-full" onClick={onClickFn}>Retry</Button>
      </CardFooter>
    </Card>
  );
}

export default DatabaseError;
