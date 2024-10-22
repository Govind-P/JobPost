import React,{useState,useEffect,useContext} from 'react';
import backendApi from '../common/backendApi.js';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Context from '../context/index.js';
import Loading from '../components/loading.js';

//icons
import { FiPhone } from "react-icons/fi";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const MobileLogin = () => {
  const [isLoading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [mobile,setMobile] = useState('');
  const[otpMobile,setOtpMobile] =useState('')
  const [otpSend,setOtpSend] = useState(false);
  const [mobileV,setMobileV] =useState(false);
  const {fetchRecruiterData}=useContext(Context);
  const [resendOTP,setResendOTP] = useState(true);
  const [count,setCount] = useState(1);
  const [seconds, setSeconds] = useState(60);

  const handleOtpMobile = (e) => {
      setOtpMobile(e.target.value);
  }
  const handleMobile = (e) => {
      setMobile(e.target.value);
  }
  const handleSubmitMobile =async (e) => {
      e.preventDefault();
      setLoading(true);
      const res=await fetch(backendApi.loginMobile.url,{
      method: backendApi.loginMobile.method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          mobile: mobile,
          count: count
      })
      });
      const data=await res.json();
      setLoading(false);
      if(data.success){
        setCount(prevCount=>prevCount+1);
        setResendOTP(false);
        setSeconds(60);
        toast.success(data.message);
        setMobileV(true);
        setOtpSend(true);
      }
      else{
        toast.error(data.message);
      } 
  }
  const handleSubmitMobileOTP =async (e) => {
    e.preventDefault();
    setLoading(true);
    const res=await fetch(backendApi.loginMobileOtp.url,{
    method: backendApi.loginMobileOtp.method,
    headers: {'Content-Type': 'application/json'},
    credentials:'include',
    body: JSON.stringify({
        otp: otpMobile,
        mobile: mobile
    })
    });
    const data=await res.json();
    if(data.success){
      toast.success(data.message);
      navigate('/dashboard',{replace:true});
      setOtpMobile('');
      setMobile('');
      fetchRecruiterData();
      localStorage.setItem('token', data.data);
      setLoading(false);
    }
    else{
      setLoading(false);
      toast.error(data.message);
    } 
}


//timer
useEffect(() => {
  if (seconds > 0) {
    const timerId = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 1) {
          setResendOTP(true); 
        }
        return prevSeconds - 1;
      });
    }, 1000); 
    return () => clearInterval(timerId);
  }
}, [seconds, setResendOTP]);


return (
  <div className=' w-full h-fit'>
    {
          isLoading && (
            <div className="fixed inset-0 z-50 flex items-center opacity-80 bg-slate-500 justify-center  bg-opacity-75">
              <Loading /> 
            </div>
          )
      }
  <form className='flex  flex-col w-full h-fit items-center justify-center gap-2 '
  onSubmit={handleSubmitMobile}>
    <div className='w-full relative'>
      <input type='tel' placeholder='Mobile' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600 appearance-none'
      required
      name='mobile'
      disabled={mobileV}
      pattern="[5-9]{1}[0-9]{9}"
      title="Please enter a valid mobile."
      value={mobile}
      onChange={handleMobile}/>
      <FiPhone className='absolute top-3 left-3 text-xl text-gray-500'/>
      {(
        mobileV && (
            <CheckCircleIcon className='absolute top-3 right-3 text-xl text-green-500' />
        )
      )}
    </div>            
    <div className='w-full pt-2 '>
    <button type='submit' 
      className={`relative w-full ${mobileV && !resendOTP && 'pointer-events-none border-gray-600'}  overflow-hidden flex items-center justify-center text-white rounded-md text-center px-5 py-2 border border-blue-500 gap-1 group cursor-pointer`}>
      <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>
      <span className={`absolute inset-0 bg-blue-500 transition-none lg:hidden ${otpSend && 'bg-slate-400'}`}></span>
      {
        otpSend && !resendOTP ? (<div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Check Mobile</div>):
        (<div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Send OTP</div>)
      }
      </button>
    </div>
   </form>
   {mobileV && !resendOTP && <div className={`pt-2 w-full flex items-center text-xs font-semibold justify-center text-gray-700`}>
          <div>Resend OTP in <span>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</span></div>
     </div>}
   <form className='flex pt-5 flex-col w-full h-fit items-center justify-center gap-2 '
  onSubmit={handleSubmitMobileOTP}>
    <div className='w-full relative'>
      <input type='text' placeholder='Mobile OTP' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600 appearance-none'
      required
      name='otpMobile'
      pattern="[0-9]{6}"
      value={otpMobile}
      onChange={handleOtpMobile}/>
      <FiPhone className='absolute top-3 left-3 text-xl text-gray-500'/>
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

export default MobileLogin;