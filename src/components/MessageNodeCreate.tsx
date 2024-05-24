import { BsChatText } from "react-icons/bs";

// Custom Node for creating new message nodes
export default function MessageNodeCreate() {
  return (
    <div className='flex flex-col items-center border border-blue-500 gap-1 p-2 w-40
     rounded-md cursor-pointer'>
        <BsChatText/>
        <p>Message</p>
    </div>
  )
}
