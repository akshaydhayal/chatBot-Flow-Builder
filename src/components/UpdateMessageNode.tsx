import  { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";

export default function UpdateMessageNode({clickedNodeValue,clickedNodeId,nodes,
    setNodes,setShowNodePanel}) {
        console.log("clicked id in updateMsg: ",clickedNodeId);
        console.log("clicked node val in updateMsg: ",clickedNodeValue);

    const [nodeUpdatedValue,setNodeUpdatedValue]=useState(clickedNodeValue);
    useEffect(()=>{
        setNodeUpdatedValue(clickedNodeValue);
    },[clickedNodeValue])

    async function handleNodeChange(val,id){
        console.log(val);
        const res=nodes.map((n)=>{
            if(n.id===id){
                n.data={...n.data,msg:val}
            }
            return n;
        });
        console.log(res);
        setNodes(res);
    }
  return (
    <div className="border border-slate-400 py-2">
      <div className="flex gap-16 items-center border-b p-2 text-center border-slate-400">
        <FaArrowLeft className='cursor-pointer hover:text-slate-400' onClick={()=>{
            setShowNodePanel(true);
        }}/>
        <p className="font-medium text-lg">
          Message
        </p>
      </div>
      <p className="text-slate-600 p-4 ">Text</p>
      <div className="px-4">
        <input
          className="border p-2 py-4 border-slate-600 rounded-lg font-medium"
          type="text"
          value={nodeUpdatedValue}
          onChange={(e) => {
            setNodeUpdatedValue(e.target.value);
            handleNodeChange(e.target.value, clickedNodeId);
          }}
        />
      </div>
    </div>
  );
}
