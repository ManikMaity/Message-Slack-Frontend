import Quill from "quill";
import { useEffect, useRef, useState } from "react";

export function MessageRenderer({ value }) {
  const renderRef = useRef(null);

  useEffect(() => {
    console.log("Value: ", value);
    if (!renderRef.current) return;
    const renderQuill = new Quill(document.createElement("div"), {
      theme: "snow",
    });
    // Disable editting
    renderQuill.disable();
    const content = JSON.parse(value.replace(/\n/g, "\\n"));
    renderQuill.setContents(content);
    const isContentEmpty = renderQuill.getText().trim().length === 0;
    if (isContentEmpty) {
      renderRef.current.innerHTML = "No content";
      return;
    }
    console.log("Content: ", renderQuill.root.innerHTML);
    renderRef.current.innerHTML = renderQuill.root.innerHTML;
  }, [value]);

  return <div className="ql-editor ql-renderer" ref={renderRef} />;
}

