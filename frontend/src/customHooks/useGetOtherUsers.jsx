import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/userSlice"
import { useSelector } from "react-redux"
// import { useGetOtherUsers } from "../../../backend/controllers/user.controllers"

const useGetOtherUsers =() => {
    let dispatch = useDispatch()
    let {userData} = useSelector(state=>state.user);
    useEffect(() => {
        const fetchUser = async()=>{
            try{
                let result = await axios.get(`${serverUrl}/api/user/others`, {withCredentials:true});
                    dispatch(setOtherUsers(result.data));
            }catch(error){
                console.log(error);
            }
        }
        fetchUser();
    }, [userData]); //dependency array to avoid infinite loop//
}

export default useGetOtherUsers;