import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import CustomTooltip from "@/components/atoms/Tooltip/CustomTooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dateStringToLocalString, dateStringToTime } from "@/utils/dataFormater";
import React from "react";
import './message.css';
import useAuthContext from "@/hooks/apis/context/useAuthContext";

const data = {
  "_id": "677e1a86354df5b9dc72be63",
  "text": "{\"ops\":[{\"insert\":\"hello\\n\"}]}",
  "channelId": "6765a50c21299891f9410921",
  "senderId": {
      "_id": "6736fbce428c5298f1c51426",
      "username": "manik123",
      "email": "manikmaity@gmail.com",
      "avatar": "https://robohash.org/manik123"
  },
  "workspaceId": "6745f49ea385c60f6b2c4314",
  "createdAt": "2025-01-08T06:26:14.141Z",
  "updatedAt": "2025-01-08T06:26:14.141Z",
  "__v": 0
};

function Message({messageData = data}) {

  const {auth} = useAuthContext();
  console.log(auth?.user._id);

  return (
    <div className={`w-full px-2 md:px-4 py-2 my-2 bg-transparent flex ${messageData?.senderId?._id === auth?.user?._id ? 'justify-end' : 'justify-start'} gap-2 hover:bg-gray-200 dark:hover:bg-slate-800 text-black text-sm dark:text-white`}>
      <Avatar className="rounded-md shadow-sm bg-gray-400 dark:bg-slate-950">
        <AvatarImage src={messageData?.senderId?.avatar} />
        <AvatarFallback className="rounded-md bg-gray-600 text-sm">
          {messageData?.senderId?.username[0].toUpperCase() || "User"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <div className="flex justify-start gap-2 items-start">
          <p className="font-bold leading-none text-sm  hover:underline cursor-pointer">
            {messageData?.senderId?.username}
          </p>
          <CustomTooltip content={dateStringToLocalString(messageData?.createdAt)}>
            <p className="opacity-80 leading-none hover:underline cursor-pointer">
              {dateStringToTime(messageData?.createdAt)}
            </p>
          </CustomTooltip>
        </div>
        <div className="mt-0.5">
          <MessageRenderer
            value={messageData?.text}
          />
        </div>
      </div>
    </div>
  );
}

export default Message;
