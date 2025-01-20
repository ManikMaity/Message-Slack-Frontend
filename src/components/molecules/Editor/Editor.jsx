import "quill/dist/quill.snow.css";

import { ALargeSmallIcon, Bot, ImageIcon, SendHorizonal, X } from "lucide-react";
import Quill from "quill";
import { useEffect, useRef, useState } from "react";

import CustomTooltip from "@/components/atoms/Tooltip/CustomTooltip";
import { Button } from "@/components/ui/button";
import useUploadImage from "@/hooks/firebase/useUploadImage";
import { Progress } from "@/components/ui/progress";
import { getErrorMessage } from "@/utils/getErrorMessage";
import usePromptResponse from "@/hooks/gemini/usePromptResponse";
import Spinner from "../Spinner";

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
  const imageUrlRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [aiResponseOpen, setAiResponseOpen] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const imageInputRef = useRef(null);
  const {
    imageUrl,
    loadingPercentage,
    error,
    isUploading,
    isError,
    setImageUrl,
    uploadImageToFirebase,
    deleteImageFromFirebase,
    isDeletingImage,
  } = useUploadImage();

  const {getResponseFromPrompt, loading,} = usePromptResponse();

  async function handlePromptSubmit(e) {
    e.preventDefault();
    if (!userPrompt || userPrompt.trim().length === 0) return;
    const response = await getResponseFromPrompt(userPrompt);
    if (response) {
      quillRef.current?.setText(response);
      setUserPrompt("");
      setAiResponseOpen(false);
    }
  }

  async function handleImageUpload() {
    await uploadImageToFirebase(imageFile);
    imageInputRef.current.value = null;
  }

  async function handleImageCancel() {
    if (!imageUrl) return;
    await deleteImageFromFirebase(imageUrl);
    setImageUrl(null);
    setImageFile(null);
  }

  function toogleToolbar() {
    const toolbar = containerRef.current.querySelector(".ql-toolbar");
    toolbar.style.display = toolbar.style.display === "none" ? "block" : "none";
  }

  useEffect(() => {
    imageUrlRef.current = imageUrl;
  }, [imageUrl]);

  function handleSend() {
    if (quillRef.current) {
      const data = quillRef.current?.getContents();
      onSubmit({ editorContent: data, simpleText: quillRef.current?.getText(), image : imageUrlRef.current });
      quillRef.current.setText("");
      setImageUrl(null);
      setImageFile(null);
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
              handler: function () {
                handleSend();
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

  useEffect(() => {
    if (!imageFile) return;
    setImageUrl(null);
    if (imageFile) {
      handleImageUpload();
    }
  }, [imageFile]);

  return (
    <div className="flex flex-col md:p-1 relative">
      {imageFile && (
        <div className="h-20 w-20 rounded-md overflow-hidden shadow-md absolute z-20 border-2 mb-2 -top-20 bg-gray-200 dark:bg-gray-800">
          <Button
            className="absolute top-1 right-1"
            size="xs"
            variant="outline"
            onClick={handleImageCancel}
          >
            <X />
          </Button>
          {isUploading && (
            <Progress
              className="w-[90%] mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              value={loadingPercentage}
            />
          )}
          {isError && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {getErrorMessage(error)}
            </div>
          )}
          {imageUrl && (
            <img className="size-full" src={imageUrl} alt="uploaded image" />
          )}
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        className="hidden"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <div className="flex flex-col md:border border-slate-300 dark:bg-slate-950 bg-gray-200  rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400">
      {aiResponseOpen && <form className="w-full h-10 bg-slate-950 p-0.5 flex justify-between" onSubmit={handlePromptSubmit}>
        <input type="text" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} placeholder="Give prompt here..." className="w-full bg-transparent px-2 text-sm outline-none" />
        <CustomTooltip content="Generate" side="right">
            <Button type="submit" variant="secondary" disabled={loading} className="h-full">
             { loading ? <Spinner /> : <SendHorizonal />}
            </Button>
          </CustomTooltip>
      </form>}
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
                disabled={isUploading || isDeletingImage}
                onClick={() => imageInputRef.current?.click()}
              >
                <ImageIcon />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Generate AI text" side="left">
              <Button variant={"ghost"} size="sm" onClick={() => setAiResponseOpen(!aiResponseOpen)} >
                <Bot />
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
