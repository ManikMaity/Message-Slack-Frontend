import { getErrorMessage } from "@/utils/getErrorMessage";
import useAuthContext from "../apis/context/useAuthContext";
import useSocketContext from "../apis/context/useSocketContext";
import useUploadImage from "../firebase/useUploadImage";
import { toast } from "../use-toast";

function useHandleDMs({ memberId, roomId, workspaceId }) {
  const { socket } = useSocketContext();
  const { deleteImageFromFirebase } = useUploadImage();
  const { auth } = useAuthContext();

  function handleSubmit({ editorContent, image }) {
    const jsonContent = JSON.stringify(editorContent);
    console.log(jsonContent);
    socket?.emit(
      "NewDmMessage",
      {
        channelId: memberId,
        roomId: roomId,
        text: jsonContent,
        image,
        senderId: auth?.user?._id,
        workspaceId: workspaceId,
      },
      (data) => {
        console.log(data);
      }
    );
  }

  async function handleDeleteMessage(messageData) {
    const confirm = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirm) return;

    if (messageData?.image) {
      await deleteImageFromFirebase(messageData?.image);
    }

    socket?.emit(
      "NewEditedDmMessage",
      {
        roomId : messageData?.roomId,
        channelId: messageData.channelId,
        messageId: messageData._id,
        token: auth?.token,
        updateContent: {
          text: "dlMessage",
          image: "dlImg",
        },
      },
      (data) => {
        if (data?.success) {
          toast({
            title: "Message Deleted",
            description: "Message deleted successfully",
          });
        } else {
          toast({
            title: "Error",
            description: getErrorMessage(data) || "Error while deleting message",
          });
        }
      }
    );
  }

  function onReactionClick(reaction, messageData) {
    socket.emit(
      "NewDmMessageLike",
      {
        roomId :  messageData?.roomId,
        workspaceId: messageData?.workspaceId,
        messageId: messageData?._id,
        channelId: messageData?.channelId,
        token: auth?.token,
        likeContent: reaction,
      },
      (data) =>  {
        if (!data?.success) {
          toast({
            description: getErrorMessage(data) || "Error while liking message",
          });
        } 
      }
    );
  }

  return { handleSubmit, handleDeleteMessage, handleRecationClick : onReactionClick };
}

export default useHandleDMs;
