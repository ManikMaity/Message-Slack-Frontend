import { cva } from "class-variance-authority";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MemberWorkspacePannelBtn({variant = "default", name, memberId = "member", image, role = "member"}) {
    const memberWorkspacePannelBtnVariants = cva(
        "flex items-center justify-start gap-2 px-2 text-sm h-8",
        {
          variants: {
            varient: {
              default: "text-white/80 dark:text-white/50",
              active: "bg-[#7D3986] dark:bg-slate-700 text-white hover:bg-[#7D3986] dark:hover:bg-slate-700",
            },
          },
          defaultVariants: "default",
        }
      );
    
      const { id } = useParams();
    
      return (
        <Button className={cn(memberWorkspacePannelBtnVariants({ varient: variant }))} variant="transparent" size="xs">
          <Link className="flex h-full py-1 items-center gap-2 w-full" to={`/workspace/${id}/member/${memberId}`}>
            <img className="rounded-sm object-cover h-[1.4rem] w-[1.4rem]" src={image} alt="" />
            <span>{name}</span>
            {role !== "member" && <span className="text-xs font-normal opacity-50">{role}</span>}
          </Link>
        </Button>
      );
}

export default MemberWorkspacePannelBtn;
