import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import MemberMessageHeader from "@/components/atoms/MemberMessage/MemberMessageHeader";
import ChatInput from "@/components/molecules/ChatInput/ChatInput";
import Message from "@/components/molecules/Message/Message";
import Spinner from "@/components/molecules/Spinner";
import useAuthContext from "@/hooks/apis/context/useAuthContext";
import useChannelMessageContext from "@/hooks/apis/context/useChannelMessageContext";
import useSocketContext from "@/hooks/apis/context/useSocketContext";
import useGetMemberDetails from "@/hooks/apis/member/useGetMemberDetails";
import useFetchDMs from "@/hooks/apis/message/useFetchDMs";
import { getErrorMessage } from "@/utils/getErrorMessage";

import DatabaseError from "../errors/DatabaseError";
import useHandleDMs from "@/hooks/message/useHandleDMs";

function MemberLayout() {

    const {memberId, id} = useParams();
    const {auth} = useAuthContext();

    const roomId = [auth?.user?._id, memberId].sort().join("-");

   
    const {memberDetails, isMemberDetailsLoading, isMemberDetailsSuccess, isMemberDetailsError, memberDetailsError, refetch} = useGetMemberDetails({workspaceId : id, memberId : memberId});
    const {messages, isLoading, isError, isSuccess} = useFetchDMs({roomId : roomId, page : 1, limit : 20, workspaceId : id});
    const { joinChannel, leaveChannel} = useSocketContext();
  const { channelMessages, setChannelMessages } = useChannelMessageContext();
  const messageContainerRef = useRef(null);

  const {handleSubmit, handleDeleteMessage, handleRecationClick} = useHandleDMs({memberId, roomId, workspaceId: id});

 
  useEffect(() => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    }, [channelMessages]);

    useEffect(() => {
      if (!isLoading && !isError) {
        joinChannel({ channelId : roomId });
      }
      return () => {
        leaveChannel({ channelId : roomId });
      };
    }, [isLoading, isError, roomId]);

    useEffect(() => {
      if (isSuccess) {
        setChannelMessages(messages);
      }
    }, [isSuccess, messages, setChannelMessages, memberId]);

    if (isLoading || isMemberDetailsLoading) {
      return (
        <div className="h-full grid place-content-center">
          <Spinner />
        </div>
      );
    }

    if (isError || isMemberDetailsError) {
      return (
        <div>
          <DatabaseError
            errorTitle={getErrorMessage(memberDetailsError)}
            errorMessage={getErrorMessage(memberDetailsError)}
            onClickFn={() => refetch()}
          />
        </div>
      );
    }


  return (
    <div className="h-full relative flex flex-col">
      <div className="flex-1 max-h-[calc(100%-140px)]">
        <MemberMessageHeader memberDetails={memberDetails}/>
        {isMemberDetailsSuccess && channelMessages ? (
          <div
            className="flex flex-col gap-1 h-[calc(100%-50px)] overflow-y-scroll"
            ref={messageContainerRef}
          >
            {channelMessages?.map((message) => (
              <Message messageData={message} key={message?._id} handleDeleteMessage={handleDeleteMessage} handleReactionClick={handleRecationClick} />
            ))}
          </div>
        ) : (
          <div className="h-full grid place-content-center">
            <Spinner />
          </div>
        )}
      </div>
      <ChatInput handleSubmit={handleSubmit}/>
    </div>
  );
}

export default MemberLayout;
