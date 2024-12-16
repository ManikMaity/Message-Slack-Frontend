import { DropdownMenuRadioGroup } from "@radix-ui/react-dropdown-menu";
import { Workflow } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ChangeWorkspaceListLoader from "@/components/atoms/SkeletonLoaders/ChangeWorkspaceListLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetUserWorkspace from "@/hooks/apis/workspaces/useGetUserWorkspace";

function ChangeWorkspaceBtn({ currentWorkspace }) {
  const { workspacesData, isLoading, isError, isSuccess } =
    useGetUserWorkspace();
  const navigate = useNavigate();
  const handleWorkspaceChange = (value) => {
    navigate(`/workspace/${value}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="hover:opacity-50 cursor-pointer rounded-md mx-auto dark:border-white">
          <AvatarImage className="object-cover" src={currentWorkspace?.image} />
          <AvatarFallback className="rounded-md">
            <p className="font-bold">
              {currentWorkspace?.name
                ?.split(" ")
                ?.map((word) => word[0]?.toUpperCase())
                ?.join("") || <Workflow />}
            </p>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-1">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isError && <p className="text-red-500 p-2 text-sm">Something went wrong</p>}
        {isLoading && <ChangeWorkspaceListLoader/>}
        {isSuccess &&<DropdownMenuRadioGroup
          value={currentWorkspace?._id}
          onValueChange={handleWorkspaceChange}
          className="h-44 overflow-y-scroll"
        >
          {workspacesData?.data?.map((workspace) => (
            <DropdownMenuRadioItem value={workspace._id} key={workspace._id}>
              <p>{workspace.name}</p>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ChangeWorkspaceBtn;
