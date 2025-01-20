import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import Spinner from "@/components/molecules/Spinner";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useSearchMessage from "@/hooks/apis/message/useSearchMessage";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatabaseError from "../../errors/DatabaseError";
import { isJsonString } from "@/utils/dataFormater";

function SearchContent({ debouncedQuery }) {

  const navigator = useNavigate();
  const { id } = useParams();
  const {setSearchModalOpen } = useModalOpenContext();



  const {
    messages,
    messagesError,
    isMessagesError,
    isMessagesSuccess,
    isMessagesLoading,
    refetch,
  } = useSearchMessage({ workspaceId: id, searchQuery : debouncedQuery });


  return (
    <div className="py-1">
      {isMessagesSuccess && messages?.length !== 0 && (
        <div className="max-h-80 overflow-y-auto">
          {messages?.reverse().map((message) => {
            return (
              <button
                key={message._id}
                onClick={() => {
                  navigator(
                    `/workspace/${message.workspaceId}/channel/${message.channelId}`
                  );
                  setSearchModalOpen(false);
                }}
                className="py-1 flex w-full items-center gap-2 hover:bg-gray-200 dark:hover:bg-accent/30 px-3 cursor-pointer"
              >
                <div className="w-9 rounded-md overflow-hidden">
                  <img
                    className="w-full"
                    src={message?.senderId?.avatar}
                    alt={message?.senderId?.username + "s avatar"}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-thin text-sm text-start">
                    {message?.senderId?.username}
                  </span>
                  <div className="line-clamp-1">
                    {isJsonString(message?.text) ?  <MessageRenderer value={message?.text} /> : <p>{message?.text}</p> }
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
      {isMessagesSuccess && messages?.length === 0 && (
        <p className="py-2 px-3">No messages found</p>
      )}
      {isMessagesLoading && (
        <div className="w-full py-2 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {isMessagesError && (
        <DatabaseError
          onClickFn={() => refetch()}
          errorTitle={messagesError.message}
        />
      )}
    </div>
  );
}

export default SearchContent;
