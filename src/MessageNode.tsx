import { Handle, NodeProps, Position, useReactFlow } from 'reactflow'
import { IoLogoWhatsapp } from "react-icons/io";
import { BsChatText } from "react-icons/bs";

export default function MessageNode({data:{msg},id}:NodeProps<{msg:string}>) {
    const {setNodes}=useReactFlow();
  return (
    <div className="w-56 border rounded-md shadow-lg">
      <div className="bg-[#b4f4e4] flex justify-between items-center px-2">
        <div className='flex items-center'>
            <BsChatText />
            <p className=" text-black p-1 px-2 text-lg font-bold tracking-tight">
            Send Message
            </p>
        </div>
        <IoLogoWhatsapp className="w-6 h-6 text-green-500 bg-white rounded-full p-1" />
      </div>
      <div>
        <p className='px-4 p-2 text-slate-600 font-medium'>{msg}</p>
      </div>
      {/* <p className='border p-1 px-2' onClick={()=>{
        setNodes(prev=>prev.filter(n=>n.id!==id));
      }}>X</p> */}
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right}/>
    </div>
  );
}