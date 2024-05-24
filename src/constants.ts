import { Edge, Node } from "reactflow";

// Initial set of nodes for the flow
export const initialNodes: Node[] = [
  {
    id: "1", // Unique ID for the node
    position: { x: 100, y: 20 }, // Position of the node on the canvas
    data: { msg: "Hello" }, // Data associated with the node, including the message
    type: "MessageNode", // Type of the node, specifying it's a MessageNode
  },
  {
    id: "2",
    position: { x: 400, y: 220 },
    data: {},
    hidden: true,
    type: "MessageNodeCreate",
  },
];

// Initial set of edges for the flow, empty initially
export const initialEdges:Edge[]=[]