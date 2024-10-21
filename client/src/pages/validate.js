import React,{useState,useEffect} from 'react';
import backendApi from '../common/backendApi.js';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Context from '../context/index.js';
import { useContext } from 'react';
import Loading from '../components/loading.js';

//icons
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';

const Validate = () => {
  const [isLoading,setLoading] = useState(false);
  const isLoggedIn=useSelector(state=>state.recruiter.isLoggedIn);
  const navigate = useNavigate();
  const[otpEmail,setOtpEmail] =useState('')
  const[otpMobile,setOtpMobile] =useState('')
  const [emailV,setEmailV] =useState(false);
  const [mobileV,setMobileV] =useState(false);
  const {fetchRecruiterData}=useContext(Context);



  const handleOtpEmail = (e) => {
    setOtpEmail(e.target.value);
  }
  const handleOtpMobile = (e) => {
    setOtpMobile(e.target.value);
  }

  const handleSubmitMobile =async (e) => {
    setLoading(true);
    e.preventDefault();
    const res=await fetch(backendApi.validateMobile.url,{
      method: backendApi.validateMobile.method,
      headers: {'Content-Type': 'application/json'},
      credentials:'include',
      body: JSON.stringify({
        otpMobile: otpMobile
      })
    });
    const data=await res.json();
    setLoading(false);
    if(data.success){
      toast.success(data.message);
      setMobileV(true);
    }
    else{
      toast.error(data.message);
    } 
    setOtpMobile('');
  }

  const handleSubmitEmail =async (e) => {
    setLoading(true);
    e.preventDefault();
    const res=await fetch(backendApi.validateEmail.url,{
      method: backendApi.validateEmail.method,
      headers: {'Content-Type': 'application/json'},
      credentials:'include',
      body: JSON.stringify({
        otpEmail: otpEmail
      })
    });
    const data=await res.json();
    setLoading(false);
    if(data.success){
      toast.success(data.message);
      setEmailV(true);
    }
    else{
      toast.error(data.message);
    }
    setOtpEmail(''); 
  }

  const handleSubmit=async()=>{
    setLoading(true);  
    if(emailV && mobileV){
      const res=await fetch(backendApi.proceedDashboard.url,{
        method: backendApi.proceedDashboard.method,
        headers: {'Content-Type': 'application/json'},
        credentials:'include',
      });
      const data=await res.json();
      if(data.success){
        toast.success(data.message);
        localStorage.removeItem('tokenD');
        localStorage.setItem('token',data.data);
        fetchRecruiterData();
        setLoading(false);
        navigate('/dashboard',{replace:true});
      }
      else{
        setLoading(false);
        toast.error(data.message);
      } 
    }
  }

  useEffect(()=>{
    if(isLoggedIn){
      navigate('/dashboard',{replace:true});
    }
  },[isLoggedIn]);

  useEffect(()=>{
    console.log(localStorage.getItem('tokenD'));
    if(localStorage.getItem('tokenD')==null){
      navigate('/login',{replace:true})
    }
  },[]);


  useEffect(() => {},[]);
  return (
    <div className='container mx-auto w-screen min-h-screen h-full pt-20 lg:pt-16'>
      {
          isLoading && (
            <div className="fixed inset-0 z-50 flex items-center opacity-80 bg-slate-500 justify-center  bg-opacity-75">
              <Loading /> 
            </div>
          )
      }
        <div className='flex h-full flex-col lg:flex-row items-center justify-center gap-3 '>
            <div className='h-fit lg:h-full  text-center lg:w-1/2 w-full flex items-center justify-center'>
                <div className='h-fit text-lg font-serif text-blue-950'>
                To proceed, please confirm your email address and phone number. We want to ensure your account is secure and that you receive important updates.
                <br/>
                <span className='font-sans text-sm text-red-700'>If you encounter any issues, feel free to contact our support team for assistance!</span>
                </div>
            </div>
            <div className='md:h-fit lg:h-full  lg:w-1/2 w-full flex items-center justify-center py-2 lg:p-8'>
            <div className='flex py-7 md:px-6 px-4 flex-col w-3/4 md:w-2/3 lg:w-3/4 h-fit items-center justify-center gap-2 rounded-lg  border-2 border-violet-500'>
              <form className='flex  flex-col w-full h-fit items-center justify-center gap-2 '
              onSubmit={handleSubmitEmail}>
                <div className='font-bold text-3xl text-blue-900'>Verify</div>
                <div className='text-md font-semibold text-gray-600 pb-6'>Only one step to future of hiring!</div>
                <div className='w-full relative'>
                  <input type='text' placeholder='Email OTP' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600 appearance-none'
                  required
                  name='otpEmail'
                  pattern="[0-9]{6}"
                  value={otpEmail}
                  onChange={handleOtpEmail}/>
                  <MdOutlineMailOutline className='absolute top-3 left-3 text-xl text-gray-500'/>
                  {(
                    emailV && (
                        <CheckCircleIcon className='absolute top-3 right-3 text-xl text-green-500' />
                    )
                  )}
                </div>            
                {!emailV && (<div className='w-full pt-2 '>
                <button type='submit'
                  className='relative w-full  overflow-hidden flex items-center justify-center text-white rounded-md text-center px-5 py-2 border border-blue-500 gap-1 group cursor-pointer'>
                  <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>
                  <span className="absolute inset-0 bg-blue-500 transition-none lg:hidden "></span>
                      <div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Verify Email</div>
                  </button>
                </div>)}
               </form>
              <form className='flex py-7 flex-col w-full  h-fit items-center justify-center gap-2 '
              onSubmit={handleSubmitMobile}>
                <div className='w-full relative'>
                  <input type='text' placeholder='Mobile OTP' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600'
                  required
                  name='otpMobile'
                  pattern="[0-9]{6}"
                  value={otpMobile}
                  onChange={handleOtpMobile}/>
                  <FiPhone className='absolute top-3 left-3 text-xl text-gray-500'/>
                  {(
                    mobileV && (
                        <CheckCircleIcon className='absolute top-3 right-3 text-xl text-green-500 '/>
                    )
                  )}
                </div>
                {!mobileV && (<div className='w-full pt-2 '>
                <button type='submit'
                  className='relative w-full  overflow-hidden flex items-center justify-center text-white rounded-md text-center px-5 py-2 border border-blue-500 gap-1 group cursor-pointer'>
                  <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>
                  <span className="absolute inset-0 bg-blue-500 transition-none lg:hidden "></span>
                      <div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Verify Mobile</div>
                  </button>
                </div>)}
               </form>
               {mobileV && emailV && (<div className='w-full pt-2 '>
                <button onClick={handleSubmit}
                  className='relative w-full  overflow-hidden flex items-center justify-center text-white rounded-md text-center px-5 py-2 border border-blue-500 gap-1 group cursor-pointer'>
                  <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>
                  <span className="absolute inset-0 bg-blue-500 transition-none lg:hidden "></span>
                      <div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Proceed</div>
                  </button>
                </div>)}
              </div>  
            </div>
          </div>   
      </div>
  )
}

export default Validate;