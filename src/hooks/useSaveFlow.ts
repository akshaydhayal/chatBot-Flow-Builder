import toast from "react-hot-toast";
import { Edge, Node } from "reactflow";

export function useSaveFlow(nodes:Node[],edges:Edge[]){
    const validateFlow = () => {
    const nodesWithNoOutgoingEdges = nodes.filter(
        (node) => !edges.some((edge) => edge.source === node.id)
    );

    if (nodesWithNoOutgoingEdges.length > 2) {
        return "Cannot save Flow";
    }

    return null;
    };

    const validationError = validateFlow();
    if (validationError) {
        toast.error(validationError, {
          style: { backgroundColor: "#e3c1c2", fontWeight: "500" },
        });
    } else {
        toast.success("Flow Saved!!", {
          style: { backgroundColor: "#d5dbcc", fontWeight: "500" },
        });
        console.log("Flow is valid. Saving flow...");
        // Save logic here, e.g., send nodes and edges to a backend service.
    }
    }