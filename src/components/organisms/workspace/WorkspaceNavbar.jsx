import { Info, Moon, Search, Sun } from "lucide-react";
import { useParams } from "react-router-dom";

import NavbarSkeliton from "@/components/atoms/SkeletonLoaders/NavbarSkeliton";
import { useTheme } from "@/components/organisms/theme/theme-provider";
import { Button } from "@/components/ui/button";
import useGetWorkspaceData from "@/hooks/apis/workspaces/useGetWorkspaceData";

function WorkspaceNavbar() {
  const { id } = useParams();
  const { workspaceData, isLoading, isError } = useGetWorkspaceData(id);
  const {theme, setTheme} = useTheme();

  if (isLoading || isError) {
    return (
      <div className="h-full w-full">
        <NavbarSkeliton />
      </div>
    );
  }

  return (
    <nav className="flex w-full h-full items-center justify-between px-4">
        <div></div>
      <Button variant="transparent" className="flex shadow-none items-center text-gray-300   font-normal justify-between w-[60%] max-w-md h-full bg-accent/20 dark:bg-accent/60 hover:text-white px-2 rounded-md">
        <span className="overflow-hidden">{`Search in ${workspaceData?.name}`}</span>
        <Search className="h-4 w-4" />
      </Button>
      <div className="flex gap-1">
      <Button variant="transparent" onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="grid place-content-center w-6 h-6 text-gray-300 bg dark:bg-accent/60 hover:text-white bg-accent/20 rounded-full">
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
      <Button variant="transparent"  className="grid place-content-center w-6 h-6 text-gray-300 bg dark:bg-accent/60 hover:text-white bg-accent/20 rounded-full">
        <Info/>
      </Button>
      </div>
    </nav>
  );
}

export default WorkspaceNavbar;
