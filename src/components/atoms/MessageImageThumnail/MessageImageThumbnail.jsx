import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function MessageImageThumbnail({ url }) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden cursor-zoom-in border rounded-lg max-w-[300px]">
          <img src={url} alt="messageImage" className="object-cover size-full"/>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[600px] border-none p-0 shadow-none">
        <img src={url} alt="messageImage" className="rounded-md size-full object-cover"/>
      </DialogContent>
    </Dialog>
  );
}

export default MessageImageThumbnail;
