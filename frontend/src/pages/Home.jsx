import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'
import  useGetMessage from '../customHooks/useGetMessages'
const Home = () => {
    let {selectedUser} = useSelector(state=>state.user)
   useGetMessage()
  return (
    <div className='w-full h-[100vh] flex overflow-hidden'>
        <SideBar/>
        <MessageArea/>
    </div>
  )
}

export default Home
