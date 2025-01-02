import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import CustomTooltip from "@/components/atoms/Tooltip/CustomTooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

function Message() {
  return (
    <div className="w-full px-2 md:px-4 py-2 my-2 bg-transparent flex gap-2 hover:bg-gray-200 dark:hover:bg-slate-800 text-black text-sm dark:text-white">
      <Avatar className="rounded-md shadow-sm">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="rounded-md bg-gray-600 text-base">
          CN
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col ">
        <div className="flex justify-start gap-2 items-start">
          <p className="font-bold leading-none text-base  hover:underline cursor-pointer">
            Manik Maity
          </p>
          <CustomTooltip content="Dec 31, 2022 at 12:00 AM">
            <p className="opacity-80 leading-none hover:underline cursor-pointer">
              12:00 AM
            </p>
          </CustomTooltip>
        </div>
        <div className="mt-0.5">
          <MessageRenderer
            value={` {"ops":[{"insert":"This is a mess"},{"attributes":{"list":"ordered"},"insert":"\n"},{"insert":"const i = 0;"},{"attributes":{"code-block":"plain"},"insert":"\n"},{"insert":"console.log(i);"},{"attributes":{"code-block":"plain"},"insert":"\n"},{"attributes":{"strike":true},"insert":"JHHHhjsjhshjshj"},{"insert":"\n"}]}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Message;
