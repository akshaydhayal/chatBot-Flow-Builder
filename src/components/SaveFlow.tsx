import React from 'react'

export default function SaveFlow() {
      const validateFlow = () => {
        const nodesWithNoOutgoingEdges = nodes.filter(
          (node) => !edges.some((edge) => edge.source === node.id)
        );

        if (nodesWithNoOutgoingEdges.length > 1) {
          return "Error: More than one node has no outgoing edges.";
        }

        return null;
      };

      const saveFlow = () => {
        const validationError = validateFlow();
        if (validationError) {
          alert(validationError);
        } else {
          console.log("Flow is valid. Saving flow...");
          // Save logic here, e.g., send nodes and edges to a backend service.
        }
      };

  return (
    <div>Sav</div>
  )
}
