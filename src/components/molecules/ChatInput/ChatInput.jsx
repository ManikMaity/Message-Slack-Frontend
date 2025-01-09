import { MessageRenderer } from "@/components/atoms/MessageRenderer/MessageRenderer";
import Editor from "../Editor/Editor";
import useSocketContext from "@/hooks/apis/context/useSocketContext";
import useAuthContext from "@/hooks/apis/context/useAuthContext";
import { useParams } from "react-router-dom";

function ChatInput() {
  const { socket, currentChannel } = useSocketContext();
  const { id } = useParams();
  const { auth } = useAuthContext();

  function handleSubmit({ editorContent, image }) {
    const jsonContent = JSON.stringify(editorContent);
    console.log(jsonContent);
    socket?.emit("NewMessage", {
      channelId: currentChannel,
      text: jsonContent,
      image,
      senderId: auth?.user?._id,
      workspaceId: id,
    }, (data) => {
      console.log(data);
    });
  }

  return (
    <div className="px-2 md:px-5 min-h-[140px] flex flex-col justify-end absolute bottom-0 w-full">
      <Editor
        placeholder="Type a message"
        varient="create"
        disabled={false}
        onSubmit={handleSubmit}
        onCancel={() => {}}
      />
    </div>
  );
}

export default ChatInput;
