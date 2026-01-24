import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice"
import { useSelector } from "react-redux"
import { setMessages } from "../redux/messageSlice"
// import { useGetOtherUsers } from "../../../backend/controllers/user.controllers"

const useGetMessage =() => {
    let dispatch = useDispatch()
    let {userData, selectedUser} = useSelector(state=>state.user);
    useEffect(() => {
        const fetchMessages = async()=>{
            try{
                let result = await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`, {withCredentials:true});
                    dispatch(setMessages(result.data));
            }catch(error){
                console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUser, userData]); //dependency array to avoid infinite loop//
}

export default useGetMessage