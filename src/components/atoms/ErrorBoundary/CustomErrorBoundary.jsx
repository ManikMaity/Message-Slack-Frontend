import { Button } from "@/components/ui/button";
import { CircleAlert } from "lucide-react";

function CustomErrorBoundary({ error, resetErrorBoundary }) {
  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="flex flex-col gap-3 max-w-lg items-center justify-center">
        <CircleAlert size={50} className="text-black dark:text-white"/>
        <h2 className="text-xl font-bold">{error.message}</h2>
        <Button className="w-fit" onClick={resetErrorBoundary}>Refresh</Button>
      </div>
    </div>
  );
}

export default CustomErrorBoundary;
