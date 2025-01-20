import { Search } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useSearchMessage from "@/hooks/apis/message/useSearchMessage";
import DatabaseError from "../../errors/DatabaseError";
import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import useDebounce from "@/hooks/useDebounce";

function SearchBoxModal() {
  const { searchModalOpen, setSearchModalOpen } = useModalOpenContext();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 1000);
  const {
    messages,
    messagesError,
    isMessagesError,
    isMessagesSuccess,
    isMessagesLoading,
    refetch,
  } = useSearchMessage({ workspaceId: id, searchQuery : debouncedQuery });
  console.log(messages, messagesError);

  const navigator = useNavigate();

  return (
    <Dialog
      open={searchModalOpen}
      onOpenChange={() => setSearchModalOpen(false)}
    >
      <DialogContent className="py-3 px-0 gap-0 w-[95%]">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="h-10 py-1 px-3 flex items-center justify-between gap-3">
          <Search />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages here"
            className="bg-transparent h-full w-full outline-none"
          />
        </div>
        <hr className="my-2" />
        <div className="py-1">
          {isMessagesSuccess && messages?.length !== 0 && (
            <div>
              {messages?.map((message) => {
                return (
                  <button key={message.id} onClick={() => {
                    navigator(`/workspace/${message.workspaceId}/channel/${message.channelId}`);
                    setSearchModalOpen(false);
                  }} className="py-1 flex w-full items-center gap-2 hover:bg-accent/10 dark:hover:bg-accent/30 px-3 cursor-pointer">
                    <div className="w-9 rounded-md overflow-hidden">
                      <img src={message?.senderId?.avatar} alt={message?.senderId?.username + "s avatar"} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-thin text-sm text-start">
                        {message?.senderId?.username}
                      </span>
                      <div className="line-clamp-1">
                        <MessageRenderer value={message?.text} />
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
          {isMessagesLoading && <p>Loading...</p>}
          {isMessagesError && (
            <DatabaseError
              onClickFn={() => refetch()}
              errorTitle={messagesError.message}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchBoxModal;
