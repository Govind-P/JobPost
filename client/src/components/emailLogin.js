import React,{useState,useEffect,useContext} from 'react';
import backendApi from '../common/backendApi.js';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Context from '../context/index.js';
import Loading from '../components/loading.js';



//icons
import { MdOutlineMailOutline } from "react-icons/md";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EmailLogin = () => {
    const [isLoading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const[otpEmail,setOtpEmail] =useState('')
    const [emailV,setEmailV] =useState(false);
    const [otpSend,setOtpSend] = useState(false);
    const {fetchRecruiterData}=useContext(Context);

    const handleOtpEmail = (e) => {
        setOtpEmail(e.target.value);
    }
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmitEmail =async (e) => {
        e.preventDefault();
        setLoading(true);
        const res=await fetch(backendApi.loginEmail.url,{
        method: backendApi.loginEmail.method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email
        })
        });
        const data=await res.json();
        setLoading(false);
        if(data.success){
          toast.success(data.message);
          setEmailV(true);
          setOtpSend(true);
        }
        else{
          toast.error(data.message);
        } 
    }
    const handleSubmitEmailOTP =async (e) => {
      e.preventDefault();
      setLoading(true);
      const res=await fetch(backendApi.loginEmailOtp.url,{
      method: backendApi.loginEmailOtp.method,
      headers: {'Content-Type': 'application/json'},
      credentials:'include',
      body: JSON.stringify({
          otp: otpEmail,
          email: email
      })
      });
      const data=await res.json();
      if(data.success){
        console.log(data.data)
        toast.success(data.message);
        navigate('/dashboard',{replace:true});
        setOtpEmail('');
        setEmail('');
        fetchRecruiterData();
        localStorage.setItem('token', data.data);
        setLoading(false)
      }
      else{
        setLoading(false)
        toast.error(data.message);
      } 
  }


  return (
    <div className=' w-full h-fit'>
       {
          isLoading && (
            <div className="fixed inset-0 z-50 flex items-center opacity-90 bg-slate-200 justify-center  bg-opacity-75">
              <Loading /> 
            </div>
          )
      }
    <form className='flex relative flex-col w-full h-fit items-center justify-center gap-2 z-10'
    onSubmit={handleSubmitEmail}>
      <div className='w-full relative'>
        <input type='email' placeholder='Email' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600 appearance-none '
        required
        name='email'
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        title="Please enter a valid email address."
        value={email}
        onChange={handleEmail}/>
        <MdOutlineMailOutline className='absolute top-3 left-3 text-xl text-gray-500'/>
        {(
          emailV && (
              <CheckCircleIcon className='absolute top-3 right-3 text-xl text-green-500' />
          )
        )}
      </div>            
      <div className='w-full pt-2 '>
      <button type='submit' 
        className={`relative w-full ${emailV && 'pointer-events-none border-gray-600'}  overflow-hidden flex items-center justify-center text-white rounded-md text-center px-5 py-2 border border-blue-500 gap-1 group cursor-pointer`}>
        <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>
        <span className={`absolute inset-0 bg-blue-500 transition-none lg:hidden ${otpSend && 'bg-slate-400'}`}></span>
            {
            otpSend ? (<div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Please Check Mail</div>):
            (<div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Send OTP</div>)
          }
        </button>
      </div>
     </form>
     <form className='flex pt-5 flex-col w-full h-fit items-center justify-center gap-2 '
    onSubmit={handleSubmitEmailOTP}>
      <div className='w-full relative'>
        <input type='text' placeholder='Email OTP' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600 appearance-none'
        required
        name='otpEmail'
        pattern="[0-9]{6}"
        value={otpEmail}
        onChange={handleOtpEmail}/>
        <MdOutlineMailOutline className='absolute top-3 left-3 text-xl text-gray-500'/>
      </div>            
      <div className='w-full pt-2 '>
      <button type='submit'
        className='relative w-full  overflow-hidden flex items-center justify-center text-white rounded-md text-center px-5 py-2 border border-blue-500 gap-1 group cursor-pointer'>
        <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>
        <span className="absolute inset-0 bg-blue-500 transition-none lg:hidden "></span>
            <div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Login</div>
        </button>
      </div>
     </form>
     </div>
  )
}

export default EmailLogin;