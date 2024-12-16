import { Skeleton } from "@/components/ui/skeleton";

function ChangeWorkspaceListLoader() {
  return <div className="flex flex-col gap-y-2 items-center">
    <Skeleton className="h-5 w-[150px]"/>
    <Skeleton className="h-5 w-[150px]"/>
  </div>;
}

export default ChangeWorkspaceListLoader;
