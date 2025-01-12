import Spinner from "@/components/molecules/Spinner";
import useGetMessageReactions from "@/hooks/apis/reaction/useGetMessageReactions";

function ReactionDetails({ messageId }) {

  const {data, isSuccess, isLoading, isError} = useGetMessageReactions({ messageId });
  console.log(data);


  return <div className="px-1 py-0">
    <h4>Reactions</h4>
    {isLoading && <div className="flex justify-center items-center">
      <Spinner/>
    </div> }
    {isSuccess && data?.map(reaction => 
      (<div key={reaction?._id} className="flex gap-2 h-8 items-center p-0.5 justify-between">
        <img src={reaction?.userId?.avatar} className="h-full" />
        <p className="text-xs">{reaction?.userId?.username}</p>
        <p>{reaction?.likeContent}</p>
      </div>)
    )}
  </div>;
}

export default ReactionDetails;
