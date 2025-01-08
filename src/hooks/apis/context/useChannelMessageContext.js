import ChannelMessageContext from "@/context/ChannelMessageContext";
import { useContext } from "react";

function useChannelMessageContext() {
  const { channelMessages, setChannelMessages } = useContext(
    ChannelMessageContext
  );
  return { channelMessages, setChannelMessages };
}

export default useChannelMessageContext;
