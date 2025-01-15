import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomTooltip from "../Tooltip/CustomTooltip";
import { BadgeAlert, BadgeCheck, Mail } from "lucide-react";

function MemberMessageHeader({ memberDetails }) {
  console.log(memberDetails);

  return (
    <div className="h-[50px] w-full flex items-center py-[5px] border-b border-gray-300 dark:border-slate-700">
      <Dialog>
        <DialogTrigger>
          <CustomTooltip side="bottom" content={"Get Chennel Info"}>
            <Button variant="ghost" className="text-xl ml-2">
              <img
                src={memberDetails?.avatar}
                alt={memberDetails?.username + " avatar"}
                className="h-7 rounded-sm"
              />
              <p>{memberDetails?.username}</p>
            </Button>
          </CustomTooltip>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Member Info</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-sm">
            <div className="flex justify-center">
              <img
                src={memberDetails?.avatar}
                alt={memberDetails?.username + " avatar"}
                className="h-20 w-20 rounded-full object-cover border-2"
              />
            </div>
            <div className="flex gap-2 flex-col text-base">
              <p className="font-bold">{memberDetails?.username}</p>
              <a
                href={`mailto:${memberDetails?.email}`}
                className="text-blue-500 flex items-center gap-2"
                target="_blank"
              >
                <Mail />
                {memberDetails?.email}
              </a>
              <div className="mt-2">
                {!memberDetails?.isVerified ? (
                  <p className="text-red-500 mx-auto flex items-center justify-center gap-2 mt-2">
                    <BadgeAlert />
                    Not Verified User
                  </p>
                ) : (
                  <p className="text-green-500 mx-auto flex items-center justify-center gap-2 mt-2">
                    <BadgeCheck />
                    Verified User
                  </p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MemberMessageHeader;
