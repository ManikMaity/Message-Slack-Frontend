import { Search } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useModalOpenContext from "@/hooks/apis/context/useModalOpenContext";
import useDebounce from "@/hooks/useDebounce";

import SearchContent from "./SearchContent";


function SearchBoxModal() {
  const { searchModalOpen, setSearchModalOpen } = useModalOpenContext();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 1000);



  return (
    <Dialog
      open={searchModalOpen}
      onOpenChange={() => setSearchModalOpen(false)}
    >
      <DialogContent className="py-3 px-0 gap-0 w-[95%]">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="h-10 py-1 px-3 flex items-center justify-between gap-3">
          <Search />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages here"
            className="bg-transparent h-full w-full outline-none"
          />
        </div>
        <hr className="my-2" />
        {debouncedQuery.length !== 0 && <SearchContent debouncedQuery={debouncedQuery} />}
      </DialogContent>
    </Dialog>
  );
}

export default SearchBoxModal;
