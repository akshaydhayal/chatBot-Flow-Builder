import { useSaveFlow } from '../hooks/useSaveFlow';

export default function Navbar({nodes,edges}) {
  return (
    <div className='h-[10vh] bg-slate-100 flex justify-end px-24 items-center'>
        <button className='text-slate-700 font-semibold rounded-md border
         border-slate-600 px-4 p-1' onClick={()=>{
            useSaveFlow(nodes,edges);
         }}>Save Changes</button>
    </div>
  )
}
