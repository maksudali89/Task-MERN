import { BsListTask } from "react-icons/bs";
import { AiOutlineFileDone } from "react-icons/ai";
import { MdLabelImportant } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
export  const DataItems = [
    {
        id:"All Task",
        label:" All Task",
        icon:<BsListTask/>,
        path:"/"
    },
    {
        id:"Important Task",
        label :"Important Tasks ",
        icon:<MdLabelImportant />,
        path:"/Important"
    },
    {
        id:"InComplete Task",
        label :"InComplete Tasks ",
        icon:<MdOutlinePendingActions/>,
        path:"Incomplete"
    },
    {
        id:"Completed Task",
        label :"Completed Tasks ",
        icon:<AiOutlineFileDone/>,
        path:"complete"
    }
];