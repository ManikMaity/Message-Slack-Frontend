import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

function SidebarChannelButton({ label = "Default", channelId, Icon, varient = "default" }) {

  const sidebarChannelButtonVariants = cva(
    "flex items-center justify-start gap-2 h-8 px-2 text-sm",
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
    <Button className={cn(sidebarChannelButtonVariants({ varient }))} variant="transparent" size="xs">
      <Link className="flex h-full py-1 items-center gap-0.5 w-full" to={`/workspace/${id}/channel/${channelId}`}>
        <Icon className="h-4 w-4 mr-1" />
        <span>{label}</span>
      </Link>
    </Button>
  );
}

export default SidebarChannelButton;
