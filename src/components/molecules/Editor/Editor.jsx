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
import { handler } from "tailwindcss-animate";
import CustomTooltip from "@/components/atoms/Tooltip/CustomTooltip";

function Editor({
  varient = "create",
  onSubmit,
  onCancel,
  placeholder = "Type a message here...",
  disabled = false,
  defaultValue,
}) {
  const containerRef = useRef(null);
  const defaultValueRef = useRef(defaultValue || null);
  const placeholderRef = useRef(placeholder || "");
  const quillRef = useRef(null);
  const [text, setText] = useState("");

  function toogleToolbar() {
    const toolbar = containerRef.current.querySelector(".ql-toolbar");
    toolbar.style.display = toolbar.style.display === "none" ? "block" : "none";
  }

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    const options = {
      readOnly: disabled,
      theme: "snow",
      placeholder: placeholderRef.current,
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["link", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
        keyboard: {
          bindings: {
            tab: {
              key: 9,
              handler: function (range, context) {
                return true;
              },
            },
            enter: {
              key: "Enter",
              handler: function (range, context) {
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: function () {
                editor.insertText(editor.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const editor = new Quill(editorContainer, options);
    quillRef.current = editor;
    quillRef.current.focus();

    if (defaultValueRef.current) {
      quillRef.current.clipboard.dangerouslyPasteHTML(defaultValueRef.current);
      quillRef.current.setSelection(quillRef.current.getLength(), 0);
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:p-1">
      <div className="flex flex-col md:border border-slate-300 dark:bg-slate-950 bg-gray-200  rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400">
        <div ref={containerRef} className="h-full ql-custom z-10" />
        <div className="flex px-2 pb-2 justify-between">
          <div className="flex gap-1">
            <CustomTooltip content="Toggle Toolbar" side="left">
              <Button variant={"ghost"} size="sm" onClick={toogleToolbar}>
                <ALargeSmallIcon />
              </Button>
            </CustomTooltip>

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
