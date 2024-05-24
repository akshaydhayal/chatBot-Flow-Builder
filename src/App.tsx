// import ReactFlow, { addEdge, Background, Connection, Controls, useEdges, useEdgesState, useNodesState } from "reactflow"
// import "reactflow/dist/style.css";
// import { initialEdges, initialNodes } from "./constants";
// import Navbar from "./components/Navbar";
// import NodesPanel from "./components/NodesPanel";
// import { useCallback } from "react";
// import MessageNode from "./MessageNode";
// import MessageNodeCreate from "./components/MessageNodeCreate";

// const nodeTypes={
//   'MessageNode':MessageNode,
//   'MessageNodeCreate':MessageNodeCreate
// }

// function App() {

//   const [nodes,setNodes,onNodesChange]=useNodesState(initialNodes);
//   const [edges,setEdges,onEdgesChange]=useEdgesState(initialEdges);

//   const onConnect=useCallback((connection:Connection)=>{
//     const edge={...connection,id:`${edges.length+1}`};
//     setEdges(prevEdges=>addEdge(edge,prevEdges));
//   },[]);

//   return (
//     <div className="w-screen h-screen">
//       <Navbar/>
//       <div className="w-screen h-[90vh] flex ">
//         <div className="w-3/4 h-full border-r-2 border-slate-200">
//           <ReactFlow
//             nodes={nodes}
//             edges={edges}
//             onNodesChange={onNodesChange}
//             onEdgesChange={onEdgesChange}
//             onConnect={onConnect}
//             nodeTypes={nodeTypes}
            
//           >
//             <Background />
//             <Controls />
//           </ReactFlow>
//         </div>
//         {/* <div className="w-1/4 h-full">
//           <NodesPanel/>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default App0





import { RecoilRoot } from "recoil";
import ChatBotFlow from "./ChatBotFlow";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="h-screen w-screen">
      <RecoilRoot>
        <ChatBotFlow />
        <Toaster/>
      </RecoilRoot>
    </div>
  );
}

