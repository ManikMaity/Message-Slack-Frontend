import { cva } from "class-variance-authority";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleMinus, UserCheck } from "lucide-react";
import CustomTooltip from "../Tooltip/CustomTooltip";
import useMakeMemberAdmin from "@/hooks/apis/workspaces/useMakeMemberAdmin";
import Spinner from "@/components/molecules/Spinner";

function MemberWorkspacePannelBtn({
  variant = "default",
  name,
  memberId = "member",
  userId ="member",
  image,
  role = "member",
}) {
  
  const {makeMemberAdminMutateAsync, makeMemberAdminPending} = useMakeMemberAdmin();

  const memberWorkspacePannelBtnVariants = cva(
    "flex items-center justify-start gap-2 px-2 text-sm h-8 group",
    {
      variants: {
        varient: {
          default: "text-white/80 dark:text-white/50",
          active:
            "bg-[#7D3986] dark:bg-slate-700 text-white hover:bg-[#7D3986] dark:hover:bg-slate-700",
        },
      },
      defaultVariants: "default",
    }
  );

  const { id } = useParams();

  async function makeMemberAdminHandler() {
    await makeMemberAdminMutateAsync({workspaceId : id, memberId : userId});
  }



  return (
    <div className={cn(memberWorkspacePannelBtnVariants({ varient: variant }))}>
      <Link
        className="flex h-full py-1 items-center gap-2 w-full"
        to={`/workspace/${id}/member/${memberId}`}
      >
        <img
          className="rounded-sm object-cover h-[1.4rem] w-[1.4rem]"
          src={image}
          alt=""
        />
        <span>{name}</span>
        {role !== "member" && (
          <span className="text-xs font-normal opacity-50">{role}</span>
        )}
      </Link>
      <div className="flex gap-1">
        <CustomTooltip content="Remove Member">
          <Button
            variant="transparent"
            className="p-1 group-hover:opacity-100 opacity-0 transition-all"
            size="xs"
          >
            <CircleMinus />
          </Button>
        </CustomTooltip>
        <CustomTooltip content="Make Member Admin">
        <Button
          onClick={makeMemberAdminHandler}
          variant="transparent"
          className="p-1 group-hover:opacity-100 opacity-0 transition-all"
          size="xs"
        >
          {makeMemberAdminPending ? <Spinner /> : <UserCheck />}
        </Button>
        </CustomTooltip>
      </div>
    </div>
  );
}

export default MemberWorkspacePannelBtn;
