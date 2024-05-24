import { Edge, Node } from "reactflow";

export const initialNodes:Node[]=[
    {
        id:"1",
        position:{x:100,y:20},
        data:{msg:"Hello"},
        type:"MessageNode"
    },
    {
        id:"2",
        position:{x:400,y:220},
        data:{},
        hidden:true,
        type:"MessageNodeCreate"
    }
]

export const initialEdges:Edge[]=[]