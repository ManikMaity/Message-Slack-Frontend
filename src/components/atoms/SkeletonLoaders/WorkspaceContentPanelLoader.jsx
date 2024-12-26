import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function WorkspaceContentPanelLoader() {
  return (
    <div className="flex flex-col gap-y-4 p-2 w-full h-full">

      <div className="flex justify-between w-full">
        <Skeleton className="h-10 bg-accent/20 w-4/6" />
        <Skeleton className="h-10 bg-accent/20 w-7" />
        <Skeleton className="h-10 bg-accent/20 w-7" />
      </div>

    <div className="flex flex-col w-[90%] h-[80%] justify-evenly">
      <Skeleton className="h-6 bg-accent/20" />
      <Skeleton className="h-6 bg-accent/20" />
      <Skeleton className="h-6 bg-accent/20" />
      <Skeleton className="h-6 bg-accent/20" />
      <Skeleton className="h-6 bg-accent/20" />
      <Skeleton className="h-6 bg-accent/20" />
      <Skeleton className="h-6 bg-accent/20" />
      <Skeleton className="h-6 bg-accent/20" />
      <Skeleton className="h-6 bg-accent/20" />
    </div>

    </div>
  );
}

export default WorkspaceContentPanelLoader;
