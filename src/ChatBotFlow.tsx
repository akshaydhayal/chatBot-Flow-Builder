import { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Connection,
  MarkerType,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import NodesPanel from "./components/NodesPanel";
import "./index.css";
import MessageNodeCreate from "./components/MessageNodeCreate";
import MessageNode from "./components/MessageNode";
import { initialEdges, initialNodes } from "./constants";
import Navbar from "./components/Navbar";
import UpdateMessageNode from "./components/UpdateMessageNode";
import { useRecoilValue } from "recoil";
import { nodesState } from "./store/nodesState";
import toast from "react-hot-toast";

// Define the custom node types for React Flow
const nodeTypes = {
  MessageNodeCreate: MessageNodeCreate,
  MessageNode: MessageNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`; // Function to generate unique node IDs

export default function ChatBotFlow() {
  const reactFlowWrapper = useRef(null); // Reference to the React Flow wrapper
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); // Manage state for nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); // Manage state for edges
  const [reactFlowInstance, setReactFlowInstance] = useState(null); // Store the React Flow instance

  // Retrieve the nodes state from Recoil
  const nodesData = useRecoilValue(nodesState);

  const [showNodePanel, setShowNodePanel] = useState(true); // State to toggle between NodesPanel and UpdateMessageNode
  const [clickedNodeId, setClickedNodeId] = useState(); // State to store the ID of the clicked node
  const [clickedNodeValue, setClickedNodeValue] = useState(); // State to store the value of the clicked node

  // Function to handle connection of nodes with edges
  const onConnect = useCallback(
    (connection: Connection) => {
      const existingEdge = edges.find(
        (edge) => edge.source === connection.source
      );

      // Check if there is already an edge from the source node
      if (existingEdge) {
        // Display error toast if there is already an edge
        toast.error("Only 1 edge is allowed from source handle.", {
          style: { backgroundColor: "#e3c1c2", fontWeight: "500" },
        });
        return;
      }

      // Create a new edge
      const edge = {
        ...connection,
        id: `${edges.length + 1}`,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
      };

      // Add the new edge to the edges state
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges, setEdges]
  );

  // Function to handle drag over event
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Function to handle drop event for adding new nodes
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { msg: "Bye" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Function to handle node click event
  function onNodeClick(e, val) {
    setShowNodePanel(false);
    setClickedNodeId(val.id);
    setClickedNodeValue(val.data.msg);
  }

  return (
    <div className="w-screen h-screen">
      <Navbar nodes={nodes} edges={edges} /> {/* Navbar component */}
      <ReactFlowProvider>
        <div className="w-screen h-[90vh] flex">
          {/* Container for the react flow */}
          <div
            className="w-3/4 h-full border-r-2 border-slate-200"
            ref={reactFlowWrapper}
          >
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
              onNodeClick={(e, val) => onNodeClick(e, val)}
            >
              <Controls />
              <Background/>
            </ReactFlow>
          </div>

          {/* Container for the nodes panel and update message node */}
          <div className="w-1/4 h-full">
            {showNodePanel ? (
              <NodesPanel /> // Toggle between NodesPanel and UpdateMessageNode
            ) : (
              <UpdateMessageNode
                clickedNodeValue={clickedNodeValue}
                clickedNodeId={clickedNodeId}
                setNodes={setNodes}
                nodes={nodes}
                setShowNodePanel={setShowNodePanel}
              />
            )}
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  );
}