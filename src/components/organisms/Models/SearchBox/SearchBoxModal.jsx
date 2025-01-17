import { Search } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";

function SearchBoxModal() {
  const { searchModalOpen, setSearchModalOpen } = useModalOpenContext();

  return (
    <Dialog open={searchModalOpen} onOpenChange={() => setSearchModalOpen(false)}>
      <DialogContent className="py-3 px-0 gap-0">
        <div className="h-10 py-1 px-3 flex items-center justify-between gap-3">
          <Search />
          <input
            type="text"
            placeholder="Search messages here"
            className="bg-transparent h-full w-full outline-none"
          />
        </div>
        <hr className="my-2" />
        <div className="py-1 px-3">
          <p className="text-sm">Messages</p>
          <div></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchBoxModal;
