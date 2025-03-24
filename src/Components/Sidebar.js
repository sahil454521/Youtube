import React from 'react'
import { IoMdHome} from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions,MdHistory,MdOutlinePlaylistAdd,MdOutlineWatchLater } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import Home from '../Pages/Home';


const Sidebar = () => {

const mainLinks =[
    {
        icon:<IoMdHome/>,
        name:'Home'
    },
    {
        icon:<SiYoutubeshorts/>,
        name:'Shorts'

    },
    {
        icon:<MdOutlineSubscriptions/>,
        name:'Subscriptions'

    }
]
const otherLinks=[


    {
        icon:<MdHistory/>,
        name:"History"
    },
    {
        icon:<MdOutlinePlaylistAdd/>,
        name:"PLaylist"
    },
    {
        icon:<GoVideo/>,
        name:"YourVideos"
    },
    {
        icon:<MdOutlineWatchLater/>,
        name:"WatchLater"
    },
    {
        icon:<AiOutlineLike/>,
        name:"LikedVideos"
    }

]
  return (
    <div className='w-2/12 bg-[#212121] pr-5 overflow-auto h-screen text-white p-8'>
    <ul className='flex flex-col border-b-1 border-gray-800'>
        {mainLinks.map(
            ({icon,name})=> {
                return(
                    <li Key={name} className='pl-6 py-3 hover:bg-zinc-600 ${name === "Home" "bg-slate-600" : " "}'>    
                        <a href='#' className='flex items-center gap-4 text-2xl margin-left-0'>
                        {icon}
                        <span className='text-sm tracking-wider'>{name}</span>
                        </a>
                    </li>

                )
            }
        )}
    </ul>
    <ul className=' line-8 flex flex-col border-b-1 border-gray-800 mt-4 pb-4'>
        {otherLinks.map(
            ({icon,name})=> {
                return(
                    <li Key={name} className='pl-6 py-3 hover:bg-zinc-600 ${name === "Home" "bg-slate-600" : " "}'>    
                        <a href='#' className='flex items-center gap-4 text-2xl margin-left-0'>
                        {icon}
                        <span className='text-sm tracking-wider'>{name}</span>
                        </a>
                    </li>

                )
            }
        )}
    </ul>
      
    </div>
    
  )
}

export default Sidebar
