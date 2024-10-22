import React,{useState,useEffect} from 'react';
import EmailLogin from '../components/emailLogin.js';
import MobileLogin from '../components/mobileLogin.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../components/loading.js';


const Login = () => {
  const [select,setSelect] =useState(false);
  const isLoggedIn= useSelector(state=>state.recruiter.isLoggedIn);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  
  useEffect(()=>{
    if(isLoggedIn){
      navigate('/dashboard',{replace:true});
    }
  },[isLoggedIn,navigate]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(loadingTimeout);
  }, []);

  if (isLoading) {
    return <Loading />; 
  }
  return (
    <div className='container mx-auto w-screen min-h-screen h-full pt-20 lg:pt-16 overflow-y-auto'>
        <div className='flex h-full flex-col lg:flex-row items-center justify-center gap-3 '>
            <div className='h-1/4 lg:h-full  text-center lg:w-1/2 w-full flex items-center justify-center '>
                <div className='h-fit text-lg font-serif text-blue-950 px-3'>
                Access your dashboard to streamline your hiring process. Manage job postings, track applicants, and connect with top talent effortlessly.
                </div>
            </div>
            <div className='md:h-fit lg:h-full  lg:w-1/2 w-full flex items-center justify-center py-2 lg:p-8'>
            <div className='flex py-7 md:px-6 px-4 flex-col w-3/4 md:w-2/3 lg:w-3/4 h-fit items-center justify-center gap-2 rounded-lg  border-2 border-violet-500'>
              <div className='font-bold text-3xl text-blue-900'>Login</div>
              <div className='text-md font-semibold text-gray-600 pb-6'>Do what you left behind!</div>
              <div className='flex justify-center items-center w-full h-fit pb-5'>
                <div className={`w-1/2 cursor-pointer text-center font-semibold ${!select && 'text-blue-600 after:w-[100%] after:bg-blue-500 after:transition-all after:duration-75'} 
                xl:text-lg relative  after:h-[4px] after:absolute after:-bottom-1 after:left-0`}
                onClick={()=>{setSelect(false)}}>Email</div>
                <div className={`w-1/2 cursor-pointer text-center font-semibold ${select && 'text-blue-600 after:w-[100%] after:bg-blue-500 after:transition-all after:duration-75'} 
                xl:text-lg relative  after:h-[4px] after:absolute after:-bottom-1 after:left-0`}
                onClick={()=>{setSelect(true)}}>Mobile</div>
              </div>
              {
                select ? (<MobileLogin />):
                (<EmailLogin />)
              }
              </div>  
            </div>
        </div>
    </div>
  )
}

export default Login;