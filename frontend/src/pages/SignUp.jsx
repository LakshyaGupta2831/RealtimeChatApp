import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../main'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { useSelector } from 'react-redux'

const SignUp = () => {
  let navigate=useNavigate(); //hook to navigate between pages
  let [show, setShow] = useState(false); //state to show/hide password
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  let dispatch = useDispatch();

  const handleSignUp=async (e)=>{
    e.preventDefault() //to prevent reloading of page on form submission
    setLoading(true);
    try{
      let result =await axios.post(`${serverUrl}/api/auth/signup`,{
        //data to be sent to backend
        userName, email, password 
      },{withCredentials:true})
      dispatch(setUserData(result.data));
      navigate("/profile");
      setEmail("");
      setPassword("");
      setLoading(false);
      setErr("");
    } catch (error){
      console.log( error);
      setLoading(false);
      setErr(error?.response?.data?.message); //for error display
    }
  }

  return (
    // design of signup page//
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg
      shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
        <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%]
        shadow-gray-400 shadow-lg flex items-center justify-center'>
            <h1 className='text-gray-600 font-bold text-[30px]'>Welcome to 
            <span className='text-white'> Chatly</span></h1>
        </div>

      {/* form creation*/}
      <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleSignUp}> 
        <input type="text" placeholder='Username' className='w-[90%] h-[50px]
        outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' onChange={(e)=>setUserName(e.target.value)}/>
        <input type="email" placeholder='Email' className='w-[90%] h-[50px]
        outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' onChange={(e)=>setEmail(e.target.value)}/>

        <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] 
        rounded-lg overflow-hidden shadow-gray-200 shadow-lg relative'>
            <input type={`${show?"text":"password"}`} placeholder='Password'  className='w-full h-full
            outline-none px-[20px] py-[10px] bg-white text-gray-700 text-[19px]' onChange={(e)=>setPassword(e.target.value)}/>
            <span className='absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] 
            font-semibold cursor-pointer' onClick={()=>setShow(prev=>!prev)}>{`${show?"hide":"show"}`}</span>
        </div>

{err && <p className='text-red-500'>{"*" + err}</p>}  {/*display error message if any*/}

        <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl
        shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold
        hover:shadow-inner' disabled={loading}>
          {loading?"Loading...":"Sign Up"}
        </button>
        <p className='cursor-pointer' onClick={()=>navigate("/login")}>Already Have An Account ? <span className='text-[#20c7ff] text-[bold]'>Login</span></p>
      </form>
      </div>
    </div>
  )
}

export default SignUp
