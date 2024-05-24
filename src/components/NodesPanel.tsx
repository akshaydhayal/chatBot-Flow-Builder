import MessageNodeCreate from "./MessageNodeCreate";


export default function NodesPanel(){
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div onDragStart={(event) => onDragStart(event, "MessageNode")} draggable>
        <MessageNodeCreate />
      </div>
    </div>
  );
};

