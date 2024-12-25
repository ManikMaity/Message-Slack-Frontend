import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import {
  ALargeSmallIcon,
  ImageIcon,
  SendHorizonal,
  SmileIcon,
} from "lucide-react";

function Editor({
  varient = "create",
  onSubmit,
  onCancel,
  placeholder = "Type a message here...",
  disabled = false,
  defaultValue,
}) {
  const containerRef = useRef(null);
  const [text, setText] = useState(defaultValue || "");
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options = {
      readOnly : disabled,
      theme: "snow",
      placeholder : placeholder,
      modules: {
        toolbar: [['bold', 'italic', 'underline', 'strike', 'link', 'code-block', 'clean'], [{ 'header': 1 }, { 'header': 2 }]]
      }
    };

    const editor = new Quill(editorContainer, options);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:p-1">
      <div className="flex flex-col md:border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400">
        <div ref={containerRef} className="h-full ql-custom" />
        <div className="flex px-2 pb-2 z-[5] justify-between">
          <div className="flex gap-1">
          <Button variant={"ghost"} size="sm">
            <ALargeSmallIcon />
          </Button>
          <Button variant={"ghost"} size="sm">
            <SmileIcon />
          </Button>
          <Button variant={"ghost"} size="sm">
            <ImageIcon />
          </Button>
          </div>
          <Button size="sm" variant="secondary">
            <SendHorizonal />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Editor;
