import "quill/dist/quill.snow.css";

import { ALargeSmallIcon, ImageIcon, SendHorizonal, X } from "lucide-react";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";

import CustomTooltip from "@/components/atoms/Tooltip/CustomTooltip";
import { Button } from "@/components/ui/button";
import useUploadImage from "@/hooks/firebase/useUploadImage";
import { Progress } from "@/components/ui/progress"


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
  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef(null);
  const {
    imageUrl,
    loadingPercentage,
    error,
    isUploading,
    uploadImageToFirebase,
  } = useUploadImage();

  useEffect(() => {
    console.log(imageFile);
    if (imageFile) {
      uploadImageToFirebase(imageFile);
    }
  }, [imageFile]);

  function toogleToolbar() {
    const toolbar = containerRef.current.querySelector(".ql-toolbar");
    toolbar.style.display = toolbar.style.display === "none" ? "block" : "none";
  }

  function handleSend() {
    if (quillRef.current) {
      const data = quillRef.current?.getContents();
      onSubmit({ editorContent: data });
      quillRef.current.setText("");
    }
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
    <div className="flex flex-col md:p-1 relative">
      <div className="h-20 w-20 rounded-md overflow-hidden shadow-md absolute z-20 border-2 mb-2 -top-20 bg-gray-200 dark:bg-gray-800">
        <Button className="absolute top-1 right-1" size="xs" variant="outline"><X/></Button>
        <Progress className="w-[90%] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" value={5}/>
        {/* <img
        className="size-full"
          src="https://firebasestorage.googleapis.com/v0/b/opendoor-db7d9.appspot.com/o/1732172634064images%20(2).jpg?alt=media&token=dabbdaab-60e1-4dfa-93ef-ef12ee026df2"
          alt="uploaded image"
        /> */}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        className="hidden"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <div className="flex flex-col md:border border-slate-300 dark:bg-slate-950 bg-gray-200  rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400">
        <div ref={containerRef} className="h-full ql-custom z-10" />
        <div className="flex px-2 pb-2 justify-between">
          <div className="flex gap-1">
            <CustomTooltip content="Hide editor" side="left">
              <Button variant={"ghost"} size="sm" onClick={toogleToolbar}>
                <ALargeSmallIcon />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Upload image" side="right">
              <Button
                variant={"ghost"}
                size="sm"
                onClick={() => imageInputRef.current?.click()}
              >
                <ImageIcon />
              </Button>
            </CustomTooltip>
          </div>
          <CustomTooltip content="Send message" side="right">
            <Button size="sm" variant="secondary" onClick={handleSend}>
              <SendHorizonal />
            </Button>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
}

export default Editor;
