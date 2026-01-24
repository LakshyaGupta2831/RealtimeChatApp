import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import dp from '../assets/dp.webp'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";
import { serverUrl } from '../main';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    let {userData, otherUsers, selectedUser, onlineUsers, searchData} = useSelector(state=>state.user);
    let [search, setSearch] = useState(false);
    let [input,setInput] = useState("")
    let dispatch = useDispatch();
    let navigate=useNavigate();
    const handleLogOut=async()=>{
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`, {withCredentials:true});
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

        const handlesearch=async()=>{
        try {
            let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, {withCredentials:true});
            dispatch(setSearchData(result.data))
            // console.log(result)
            // setInput("")
    }   
    catch(error){
        console.log(error)
    }
}

useEffect(() => {
  if (input.trim()) {
    handlesearch();
  } else {
    dispatch(setSearchData([])); // clear results
  }
}, [input]);


  return (
    <div className={`lg:w-[30%] lg:block ${!selectedUser?"block":"hidden"} w-full h-full
    overflow-hidden bg-slate-200 relative flex flex-col`}>
        <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden 
                flex justify-center items-center shadow-gray-500 shadow-lg fixed 
                bottom-[20px] left-[20px] bg-[#20c7ff] text-gray-700' 
                onClick={handleLogOut}>
                    <RiLogoutCircleLine className='w-[25px] h-[25px] cursor-pointer'/>
            </div>
            {search &&  input.length > 0 && 
            <div className="absolute top-[250px] w-full h-[500px] 
            overflow-y-auto bg-white z-[150] flex flex-col pt-[20px]
             gap-[10px] left-1 shadow-lg ">
            {searchData?.map((user)=>(
                        <div key={user._id}>
                            <div className='w-full h-[70px] flex items-center
                 gap-[20px] bg-white hover:bg-[#78cae5] cursor-pointer px-[10px]
                 border-b-2 border-gray-500'
                  onClick={()=>{
                    dispatch(setSelectedUser(user));
                    setInput("")
                    setSearch(false)
                  }
                    }>
            <div className='relative rounded-full bg-white
                 flex justify-center items-center'>
                    {/* change kiya */}
                    <div 
                className='w-[60px] h-[60px]  rounded-full overflow-hidden 
                flex justify-center items-center'>
            <img src={user.image || dp} alt="" className='h-[100%]'/>
            </div>
            { onlineUsers?.includes(user?._id) &&
            <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px]
             bg-[#28dc11] shadow-gray-500 shadow-md'></span>}
            </div>
            <h1 className='text-gray-800 font-semibold text-[20px] truncate w-full'>
                {user?.userName || "user"}
            </h1>
            </div>
                            </div>
                        ))}
                    </div> 
                    }


      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%]
        shadow-gray-400 shadow-lg flex flex-col justify-center
        px-[20px] relative'>
                <h1 className='text-white text-[25px] font-bold'>
                    Chatly
                </h1>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-gray-800 font-bold text-[25px]'>
                    Hii, {userData?.user?.userName || "user"}
                </h1>
                <div className='w-[60px] h-[60px] rounded-full overflow-hidden bg-white
                flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer'
                onClick={()=>navigate("/profile")}>
            <img src={userData?.user?.image || dp} alt="" className='h-[100%]'/>
            </div>
            </div>
                <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[17px]'>
                {!search && <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden 
                flex justify-center items-center bg-white shadow-gray-500 shadow-lg'
                onClick={()=>setSearch(true)}>
                    <IoIosSearch className='w-[25px] h-[25px] cursor-pointer'/>
            </div>}

            {search && 
                <form className='w-full h-[60px] bg-white shadow-gray-500
                shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full
                overflow-hidden px-[20px] relative'>
                    <IoIosSearch className='w-[25px] h-[25px] flex-shrink-0'/>
                    <input type='text' placeholder='Search Users...'
                    className='w-full h-full p-[10px] text-[17px] outline-0 border-0'
                    onChange={(e)=>setInput(e.target.value)} value = {input}/>
                    <RxCross2 className='w-[22px] h-[22px] cursor-pointer absolute right-[20px]' onClick={()=>{
  setSearch(false);
  setInput("");
}} />
                </form>
                }


{!search && !input.length && otherUsers?.map((user)=>(
        onlineUsers?.includes(user?._id) &&
                <div key={user._id} 
                className='relative rounded-full shadow-gray-500
                shadow-lg flex justify-center items-center mt-[10px] cursor-pointer'
                onClick={()=>dispatch(setSelectedUser(user))}>
                    <div 
                className='w-[60px] h-[60px]  rounded-full overflow-hidden 
                flex justify-center items-center'>
            <img src={user.image || dp} alt="" className='h-[100%]'/>
            </div>
            <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px]
             bg-[#28dc11] shadow-gray-500 shadow-md'></span>
            </div>
                ))}


            </div>
      </div>

      <div className='w-full h-[50%] overflow-auto flex flex-col
      gap-[20px] px-2 mt-[20px]'>
                    {!input.length && otherUsers?.map((user)=>(
                 <div key={user._id} className='w-ful h-[60px] flex items-center
                 gap-[20px] bg-white shadow-gray-500 shadow-lg rounded-full 
                 hover:bg-[#78cae5] cursor-pointer'
                  onClick={()=>dispatch(setSelectedUser(user))}>
  <div className='relative rounded-full shadow-gray-500
                shadow-lg flex justify-center items-center mt-[10px]'>
                    <div 
                className='w-[60px] h-[60px]  rounded-full overflow-hidden 
                flex justify-center items-center'>
            <img src={user.image || dp} alt="" className='h-[100%]'/>
            </div>
            { onlineUsers?.includes(user?._id) &&
            <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px]
             bg-[#28dc11] shadow-gray-500 shadow-md'></span>}
            </div>
            <h1 className='text-gray-800 font-semibold text-[20px]'>
                {user?.userName || "user"}
            </h1>
            </div>
                ))} 

      </div>
    </div>
  )
}

export default SideBar
