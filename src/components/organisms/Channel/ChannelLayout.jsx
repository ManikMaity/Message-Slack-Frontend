import Spinner from "@/components/molecules/Spinner";
import useGetChannelData from "@/hooks/apis/channel/useGetChannelData";
import { useParams } from "react-router-dom";
import DatabaseError from "../errors/DatabaseError";
import { getErrorMessage } from "@/utils/getErrorMessage";
import ChatInput from "@/components/molecules/ChatInput/ChatInput";
import ChannelHeader from "@/components/atoms/Channels/ChannelHeader";
import Message from "@/components/molecules/Message/Message";
import { useEffect, useRef, useState } from "react";
import useSocketContext from "@/hooks/apis/context/useSocketContext";
import useFetchChannelMessage from "@/hooks/apis/message/useFetchChannelMessage";
import useChannelMessageContext from "@/hooks/apis/context/useChannelMessageContext";

function ChannelLayout() {
  const { channelId } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const {
    channelData,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess: isMessageSuccess,
  } = useGetChannelData(channelId);
  const {
    messages,
    isLoading: messageLoading,
    isError: messageIsError,
  } = useFetchChannelMessage({ channelId, page, limit });
  const { channelMessages, setChannelMessages } = useChannelMessageContext();
  const { joinChannel } = useSocketContext();
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [channelMessages]);

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log(channelId, joinChannel);
      joinChannel({ channelId });
    }
  }, [isLoading, isError, channelId]);

  useEffect(() => {
    if (isMessageSuccess) {
      setChannelMessages(messages);
    }
  }, [isMessageSuccess, messages, setChannelMessages, channelId]);

  if (isLoading) {
    return (
      <div className="h-full grid place-content-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <DatabaseError
          errorTitle={getErrorMessage(error)}
          errorMessage={getErrorMessage(error)}
          onClickFn={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="h-full relative flex flex-col">
      <div className="flex-1 max-h-[calc(100%-140px)]">
        <ChannelHeader name={channelData?.name} id={channelData?._id} />
        {isMessageSuccess && channelMessages ? (
          <div
            className="flex flex-col gap-1 h-[calc(100%-50px)] overflow-y-scroll"
            ref={messageContainerRef}
          >
            {channelMessages?.map((message) => (
              <Message messageData={message} key={message?._id} />
            ))}
          </div>
        ) : (
          <div className="h-full grid place-content-center">
            <Spinner />
          </div>
        )}
      </div>
      <ChatInput />
    </div>
  );
}

export default ChannelLayout;
