import Editor from "../Editor/Editor";

function ChatInput() {
  return (
    <div className="px-0 md:px-5">
      <Editor 
      placeholder="Type a message"
      varient="create"
      disabled={false}
      onSubmit={() => {}}
      onCancel={() => {}}
      defaultValue={"This is a message"}
      />
    </div>
  );
}

export default ChatInput;
