import { useNavigate } from "react-router-dom";

import confusedImage from "@/assets/gifs/confuced.gif";
import { Button } from "@/components/ui/button";

function NotFound() {

    const navigator = useNavigate();

  return (
    <div className="flex w-full justify-center flex-col gap-2 items-center h-screen">
    <div className="flex flex-col items-center justify-center h-min p-4 ">
    <img className="h-32 md:h-40" src={confusedImage} alt="Not found" />
      <h1 className="text-6xl md:text-8xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-base text-gray-600">Oops! Page not found.</p>
      <div className="flex gap-2 mt-4">
      <Button  size="lg" variant="outline"
      onClick={() => navigator(-1)}
      >
        Go Back
      </Button>
      <Button  size="lg" 
      onClick={() => navigator("/")}
      >
        Go Home
      </Button>
      </div>
    </div>
    </div>
  );
}

export default NotFound;
