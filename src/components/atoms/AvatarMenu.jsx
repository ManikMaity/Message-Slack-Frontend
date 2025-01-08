import { LogOutIcon, Pencil, Settings2, User2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthContext from "@/hooks/apis/context/useAuthContext";
import useCreateWorkspaceContext from "@/hooks/apis/context/useCreateWorkspaceContext";
import useLogout from "@/hooks/apis/useLogout";

import { Button } from "../ui/button";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";

function AvatarMenu() {
  const { auth } = useAuthContext();
  const {setOpenCreateModal} = useCreateWorkspaceContext();
  const {logoutFn} = useLogout();
  const {setUserProfileModalOpen} = useModalOpenContext();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="hover:opacity-50 border-2 size-10 cursor-pointer dark:border-white">
          <AvatarImage src={auth?.user?.avatar} />
          <AvatarFallback>
            {auth?.user?.username[0]?.toUpperCase() || <User2 />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {auth?.user?.username || "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setOpenCreateModal(true)}>
          <Pencil/>
          <p>Create a Workspace</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setUserProfileModalOpen(true)}>
          <Settings2 />
          <p>Settings</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0 mt-2">
          <Button variant="error" className="w-full" onClick={logoutFn}>
          <LogOutIcon />
          <p>Logout</p>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarMenu;
