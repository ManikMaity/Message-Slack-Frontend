import { LogOutIcon, Settings2, User2 } from "lucide-react";

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
import useLogout from "@/hooks/apis/useLogout";
import { Button } from "../ui/button";

function AvatarMenu() {
  const { auth } = useAuthContext();
  const {logoutFn} = useLogout();
  console.log(auth);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="hover:opacity-50 border-2 size-10 cursor-pointer dark:border-white">
          <AvatarImage src={auth?.user?.avatar} />
          <AvatarFallback>
            {auth?.user?.username[0].toUpperCase() || <User2 />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {auth?.user?.username || "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings2 />
          <p>Settings</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0 mt-2">
          <Button className="w-full" onClick={logoutFn}>
          <LogOutIcon />
          <p>Logout</p>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarMenu;
