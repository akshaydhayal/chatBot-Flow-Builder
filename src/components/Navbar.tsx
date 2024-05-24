import { useSaveFlow } from '../hooks/useSaveFlow';

// Component representing the navigation bar for the chatbot flow builder
export default function Navbar({nodes,edges}) {
  return (
    <div className="h-[10vh] bg-slate-100 flex justify-end px-24 items-center">

      {/* Button for saving changes to the chatbot flow */}
      <button className="text-slate-700 font-semibold rounded-md border
         border-slate-600 px-4 p-1"
        onClick={() => {
          // Call the custom hook to save the flow when the button is clicked
          useSaveFlow(nodes, edges);
        }}
      >Save Changes</button>
    </div>
  );
}
