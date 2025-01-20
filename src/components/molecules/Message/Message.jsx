import "./message.css";

import { Trash } from "lucide-react";

import MessageImageThumbnail from "@/components/atoms/MessageImageThumnail/MessageImageThumbnail";
import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import Reaction from "@/components/atoms/Reaction/Reaction";
import ReactionsRender from "@/components/atoms/Reaction/ReactionsRender";
import CustomTooltip from "@/components/atoms/Tooltip/CustomTooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useAuthContext from "@/hooks/apis/context/useAuthContext";
import {
  dateStringToLocalString,
  dateStringToTime,
} from "@/utils/dataFormater";

const data = {
  _id: "677e1a86354df5b9dc72be63",
  text: "{\"ops\":[{\"insert\":\"hello\\n\"}]}",
  channelId: "6765a50c21299891f9410921",
  senderId: {
    _id: "6736fbce428c5298f1c51426",
    username: "manik123",
    email: "manikmaity@gmail.com",
    avatar: "https://robohash.org/manik123",
  },
  workspaceId: "6745f49ea385c60f6b2c4314",
  createdAt: "2025-01-08T06:26:14.141Z",
  updatedAt: "2025-01-08T06:26:14.141Z",
  __v: 0,
};

function Message({ messageData = data, handleDeleteMessage, handleReactionClick }) {

  const { auth } = useAuthContext();


  return (
    <div
      className={`w-full px-2 md:px-4 relative py-2 my-2 bg-transparent flex ${
        messageData?.senderId?._id === auth?.user?._id
          ? "justify-end"
          : "justify-start"
      } gap-2 hover:bg-gray-200 dark:hover:bg-slate-800 group text-black text-sm dark:text-white`}
    >
      {messageData?.senderId?._id !== auth?.user?._id && (
        <div className="absolute group-hover:block hidden right-5 -top-5">
          <Reaction onClickFn={(reaction) => handleReactionClick(reaction, messageData)} />
        </div>
      )}
      <Avatar className="rounded-md shadow-sm bg-gray-400 dark:bg-slate-950">
        <AvatarImage src={messageData?.senderId?.avatar} />
        <AvatarFallback className="rounded-md bg-gray-600 text-sm">
          {messageData?.senderId?.username[0].toUpperCase() || "User"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-between mx-1">
          <div className="flex gap-2 items-center">
            <p className="font-bold leading-none text-sm  hover:underline cursor-pointer">
              {messageData?.senderId?.username}
            </p>
            <CustomTooltip
              content={dateStringToLocalString(messageData?.createdAt)}
            >
              <p className="opacity-80 leading-none hover:underline cursor-pointer">
                {dateStringToTime(messageData?.createdAt)}
              </p>
            </CustomTooltip>
          </div>

          <div className="flex gap-2">
            <Button
              variant="transparent"
              className="invisible group-hover:visible"
              size="xs"
              onClick={() => handleDeleteMessage(messageData)}
            >
              <Trash />
            </Button>
          </div>
        </div>
        <div className="mt-0.5 max-w-lg">
          {messageData?.image && messageData?.image !== "dlImg" && (
            <MessageImageThumbnail url={messageData?.image} />
          )}
          {messageData?.text && messageData?.text !== "dlMessage" && (
            <>
              <MessageRenderer value={messageData?.text} />
              {messageData?.likes?.length >= 1 && <div className="mt-2">
                <ReactionsRender reactions={messageData?.likes} />
              </div>}
            </>
          )}
          {messageData?.text === "dlMessage" && (
            <p className="text-sm bg-gray-300/40 dark:bg-slate-600/60 px-2 py-1 rounded-md">
              Message Deleted
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
