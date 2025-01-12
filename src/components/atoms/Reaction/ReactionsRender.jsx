import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ReactionDetails from "./ReactionDetails";

function ReactionsRender({ reactions }) {
  return <DropdownMenu>
    <DropdownMenuTrigger className="bg-slate-950 p-1 rounded-md flex gap-1">
        {reactions?.map(reaction => <div key={reaction?._id}>{reaction?.likeContent}</div>)}
    </DropdownMenuTrigger>
     <DropdownMenuContent>
          <ReactionDetails messageId={reactions[0]?.messageId}/>
     </DropdownMenuContent>
  </DropdownMenu>;
}

export default ReactionsRender;
