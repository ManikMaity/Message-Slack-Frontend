import { Button } from "@/components/ui/button";

function SidebarButton({IconEle, label, expand = false}) {
  return (
    <Button className={`w-full text-white h-max leading-none text-xs flex ${expand ? "flex-row p-2 justify-start" : "flex-col justify-center"} active:bg-accent/10 leading-none px-2 py-3`} variant="transparent">
        <IconEle />
        <span>{label}</span>
    </Button>
  );
}

export default SidebarButton;
