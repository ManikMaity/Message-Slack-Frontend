import { Skeleton } from "@/components/ui/skeleton";

function NavbarSkeliton() {
  return (
    <div className="flex h-full justify-around gap-4">
      <Skeleton className="h-full bg-accent/20 w-[60px]" />
      <Skeleton className="h-full bg-accent/20 w-[300px]" />
      <Skeleton className="h-full bg-accent/20 w-[60px]" />
    </div>
  );
}

export default NavbarSkeliton;
