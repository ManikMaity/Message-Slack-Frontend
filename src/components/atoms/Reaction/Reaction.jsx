import { Button } from "@/components/ui/button";

function Reaction({ onClickFn }) {
  const reactions = ["😊", "👍", "😮", "👎", "😡", "😨"];

  return (
    <div className="flex gap-1 text-base md:text-lg bg-gray-300 dark:bg-slate-700 p-2 h-6 md:h-10 items-center justify-between rounded-md">
      {reactions.map((reaction, index) => (
        <Button
          variant="outline"
          size="sm"
          className="rounded-full md:h-8 md:w-8 h-4 w-4"
          key={index}
          onClick={() => onClickFn(reaction)}
        >
          {reaction}
        </Button>
      ))}
    </div>
  );
}

export default Reaction;
