import { IndianRupee, Moon, Search, Sun } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import NavbarSkeliton from "@/components/atoms/SkeletonLoaders/NavbarSkeliton";
import CustomTooltip from "@/components/atoms/Tooltip/CustomTooltip";
import { useTheme } from "@/components/organisms/theme/theme-provider";
import { Button } from "@/components/ui/button";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useGetWorkspaceData from "@/hooks/apis/workspaces/useGetWorkspaceData";
import SearchBoxModal from "../Models/SearchBox/SearchBoxModal";

function WorkspaceNavbar() {
  const { id } = useParams();
  const { workspaceData, isLoading, isError } = useGetWorkspaceData(id);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { setSearchModalOpen } = useModalOpenContext();

  if (isLoading || isError) {
    return (
      <div className="h-full w-full">
        <NavbarSkeliton />
      </div>
    );
  }

  function handleSubscribeClick() {
    navigate(`/workspace/${id}/subscribe`);
  }

  return (
    <nav className="flex w-full h-full items-center justify-between px-4">
      <div>
        <SearchBoxModal/>
      </div>
      <Button
        onClick={() => setSearchModalOpen(true)}
        variant="transparent"
        className="flex shadow-none items-center text-gray-300   font-normal justify-between w-[60%] max-w-md h-full bg-accent/20 dark:bg-accent/60 hover:text-white px-2 rounded-md"
      >
        <span className="overflow-hidden">{`Search in ${workspaceData?.name}`}</span>
        <Search className="h-4 w-4" />
      </Button>
      <div className="flex gap-1">
        <CustomTooltip content={"Change Theme"}>
          <Button
            variant="transparent"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="grid place-content-center w-6 h-6 text-gray-300 bg dark:bg-accent/60 hover:text-white bg-accent/20 rounded-full"
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </CustomTooltip>
        <CustomTooltip content={"Subcribe"}>
        <Button
          onClick={handleSubscribeClick}
          variant="transparent"
          className="grid place-content-center w-6 h-6 text-gray-300 bg dark:bg-accent/60 hover:text-white bg-accent/20 rounded-full"
        >
          <IndianRupee />
        </Button>
        </CustomTooltip>
      </div>
    </nav>
  );
}

export default WorkspaceNavbar;
