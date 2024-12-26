import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function CustomTooltip({ children, content, side = "top", align = "center" }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
        side={side}
        align={align}
        >{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CustomTooltip;
