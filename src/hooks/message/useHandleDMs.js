import useAuthContext from "../apis/context/useAuthContext";
import useSocketContext from "../apis/context/useSocketContext";
import useUploadImage from "../firebase/useUploadImage";

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

  return { handleSubmit };
}

export default useHandleDMs;
