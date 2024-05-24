// import MessageNode from './MessageNodeCreate'

import MessageNodeCreate from "./MessageNodeCreate";

// export default function NodesPanel() {
//   return (
//     <div className='flex flex-col gap-2 p-2'>
//         <MessageNode/>
//         <MessageNode/>
//     </div>
//   )
// }






export default function NodesPanel(){
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      {/* <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div>
      <div className="dndnode output"
        onDragStart={(event) => onDragStart(event, "MessageNode")}
        draggable
      >
        Message Node
      </div> */}

      <div onDragStart={(event) => onDragStart(event, "MessageNode")} draggable>
        <MessageNodeCreate />
      </div>
    </div>
  );
};

