import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import NodesPanel from "./components/NodesPanel";

import "./index.css";
import MessageNodeCreate from "./components/MessageNodeCreate";

import MessageNode from "./MessageNode";
import { initialEdges, initialNodes } from "./constants";
import Navbar from "./components/Navbar";
import UpdateMessageNode from "./components/UpdateMessageNode";
import { useRecoilValue } from "recoil";
import { nodesState } from "./store/nodesState";
import toast from "react-hot-toast";

// const initialNodes = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "input node" },
//     position: { x: 250, y: 5 },
//   },
// ];

const nodeTypes={
    'MessageNodeCreate':MessageNodeCreate,
    'MessageNode':MessageNode
}
let id = 0;
const getId = () => `dndnode_${id++}`;


export default function ChatBotFlow(){
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodesData=useRecoilValue(nodesState);
  console.log(nodesData);
  console.log(nodes);
  // console.log(nodesData.length);
  
    // if(nodesData==false){
  //   if(nodesData && nodesData.length>0){
  //     useEffect(()=>{
  //     setNodes(nodesData);
  //   },[nodesData,nodes])
  // }

  const [showNodePanel,setShowNodePanel]=useState(true);
  const [clickedNodeId,setClickedNodeId]=useState();
  const [clickedNodeValue,setClickedNodeValue]=useState();

  const onConnect=useCallback((connection:Connection)=>{

    const existingEdge = edges.find(
      (edge) => edge.source === connection.source
    );

    if (existingEdge) {
      toast.error("Only 1 edge is allowed from source handle.", {
        style: { backgroundColor: "#e3c1c2", fontWeight: "500" },
      });
      // alert("Only one connection is allowed from a source handle.");
      return;
    }

    const edge = {
      ...connection,
      id: `${edges.length + 1}`,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
      },
    };
    setEdges(prevEdges=>addEdge(edge,prevEdges));
    console.log(edges);
    
  },[edges,setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      console.log(type);
      console.log(event.dataTransfer);
      console.log(event);

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { msg: 'Bye' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  function onNodeClick(e,val){
    setShowNodePanel(false);
    console.log(e);
    console.log(val);
    setClickedNodeId(val.id);
    setClickedNodeValue(val.data.msg);
  }
  return (
    // <div className="dndflow">
    <div className="w-screen h-screen">
      <Navbar nodes={nodes} edges={edges}/>
      <ReactFlowProvider>
        {/* <div className="reactflow-wrapper" ref={reactFlowWrapper}> */}
        <div className="w-screen h-[90vh] flex">
          <div className="w-3/4 h-full border-r-2 border-slate-200" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              onNodeClick={(e,val)=>onNodeClick(e,val)}
            >
              <Controls />
            </ReactFlow>
          </div>

          <div className="w-1/4 h-full">
            {
              showNodePanel?<NodesPanel/>:
              <UpdateMessageNode clickedNodeValue={clickedNodeValue} clickedNodeId={clickedNodeId}
               setNodes={setNodes} nodes={nodes} setShowNodePanel={setShowNodePanel}/>
            }
            {/* <NodesPanel /> */}
            {/* <UpdateMessageNode/> */}
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
};



