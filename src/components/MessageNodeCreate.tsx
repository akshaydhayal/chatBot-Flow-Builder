import React from 'react'
import { BsChatText } from "react-icons/bs";
import { useReactFlow } from 'reactflow';

export default function MessageNodeCreate() {
  const {setNodes}=useReactFlow();

  function messageNodeCreateClicked(){
    setNodes(prevNodes=>[
      ...prevNodes,
      {
        id:`${prevNodes.length+1}`,
        data:{msg:"Hello"},
        position:{x:200,y:200},
        type:"MessageNode"
      } 
    ])
  }

  return (
    // <div className='flex flex-col items-center border border-blue-500 gap-1 p-2 w-48
    //  rounded-md cursor-pointer' onClick={()=>{messageNodeCreateClicked()}}>
    <div className='flex flex-col items-center border border-blue-500 gap-1 p-2 w-40
     rounded-md cursor-pointer'>
        <BsChatText/>
        <p>Message</p>
    </div>

    // <div className='flex flex-col items-center border border-blue-500 gap-1 p-2 w-2/5 rounded-md cursor-pointer'>
    //     <BsChatText/>
    //     <p>Message</p>
    // </div>
  )
}
