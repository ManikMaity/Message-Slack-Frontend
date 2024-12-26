import Spinner from "@/components/molecules/Spinner";
import useGetChannelData from "@/hooks/apis/channel/useGetChannelData";
import { useParams } from "react-router-dom";
import DatabaseError from "../errors/DatabaseError";
import { getErrorMessage } from "@/utils/getErrorMessage";
import ChatInput from "@/components/molecules/ChatInput/ChatInput";
import ChannelHeader from "@/components/atoms/Channels/ChannelHeader";

function ChannelLayout() {
  const { channelId } = useParams();
  const { channelData, isLoading, isError, error, refetch } = useGetChannelData(channelId);
  console.log(channelData, "channel data ChannelLayout");

  if (isLoading) {
    return (
      <div className="h-full grid place-content-center">
        <Spinner />
      </div>
    );
  }

  if (isError){
    return <div><DatabaseError errorTitle={getErrorMessage(error)} errorMessage={getErrorMessage(error)} onClickFn={() => refetch()} /></div>;
  }

  return <div className="h-full flex flex-col">
    <div className="flex-1">
      <ChannelHeader name={channelData?.name} id={channelData?._id}/>
    </div>
    <ChatInput/>
  </div>;
}

export default ChannelLayout;