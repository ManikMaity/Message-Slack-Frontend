import { Button } from "@/components/ui/button";

function Reaction() {
  const reactions = ["😊", "👍", "😮", "👎", "😡", "😨"];

  return (
    <div className="flex gap-1 text-lg bg-slate-700 p-2 h-10 items-center justify-between rounded-md">
      {reactions.map((reaction, index) => (
        <Button variant="outline" size="sm" className="rounded-full h-8 w-8" key={index}>{reaction}</Button>
      ))}
    </div>
  );
}

export default Reaction;
