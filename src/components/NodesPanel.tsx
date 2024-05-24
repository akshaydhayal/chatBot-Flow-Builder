import MessageNodeCreate from "./MessageNodeCreate";

// Component representing the panel for draggable nodes in the chatbot flow builder
export default function NodesPanel(){

  // Function triggered when starting to drag a node from the panel
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      {/* Wrapper for the draggable message node */}
      <div onDragStart={(event) => onDragStart(event, "MessageNode")} draggable>
        <MessageNodeCreate />
      </div>
    </div>
  );
};

