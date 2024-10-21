import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import backendApi from '../common/backendApi.js';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Loading from '../components/loading.js';


//icons
import { AiOutlineUser } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";

const SignUp = () => {
  const [isLoading,setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.recruiter.isLoggedIn);
  const navigate = useNavigate();
  const [details,setDetails] =useState({
    name: '',
    email: '',
    company: '',
    mobile: '',
    employee_count: ''
  });


  const handleChange = (e) => {
    setDetails({...details,[e.target.name]:e.target.value});
  }

  const handleSubmit =async (e) => {
    setLoading(true);
    e.preventDefault();
    const res=await fetch(backendApi.signup.url,{
      method: backendApi.signup.method,
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(details)
    });
    const data=await res.json();
    if(data.success){
      toast.success(data.message);
      localStorage.setItem('tokenD', data.data);
      setLoading(false);
      navigate('/validate',{replace:true});  
    }
    else{
      setLoading(false);
      toast.error(data.message);
    } 
  }
  
  useEffect(()=>{
    if(isLoggedIn){
      navigate('/dashboard',{replace:true});
    }
  },[isLoggedIn]);

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
                Unlock the full potential of your hiring process. Create your account to post jobs, manage applicants, and discover top talent.
                </div>
            </div>
            <div className='md:h-fit lg:h-full  lg:w-1/2 w-full flex items-center justify-center py-2 lg:p-8'>
              <form className='flex py-7 md:px-6 px-4 flex-col w-3/4 md:w-2/3 lg:w-3/4 h-fit items-center justify-center gap-2 rounded-lg  border-2 border-violet-500'
              onSubmit={handleSubmit}>
                <div className='font-bold text-3xl text-gray-900'>Sign Up</div>
                <div className='text-md font-semibold text-gray-600 pb-6'>Join Our Recruiter Community!</div>
                <div className='w-full relative'>
                  <input type='text' placeholder='Name' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600'
                  required
                  name='name'
                  value={details.name}
                  onChange={handleChange}/>
                  <AiOutlineUser className='absolute top-3 left-3 text-xl text-gray-500'/>
                </div>     
                <div className='w-full relative'>
                  <input type='tel' placeholder='Phone No.' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600'
                  required
                  name="mobile"
                  value={details.mobile}
                  onChange={handleChange}
                  pattern="[5-9]{1}[0-9]{9}"
                  title="Please enter a valid 10-digit phone number."/>
                  <FiPhone className='absolute top-3 left-3 text-xl text-gray-500'/>
                </div>
                <div className='w-full relative'>
                  <input type='text' placeholder='Company Name' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600'
                  required
                  name='company'
                  value={details.company}
                  onChange={handleChange}/>
                  <FaRegBuilding className='absolute top-3 left-3 text-xl text-gray-500'/>
                </div>
                <div className='w-full relative'>
                  <input type='email' placeholder='Company Email' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600'
                  required
                  name='email'
                  value={details.email}
                  onChange={handleChange}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address."/>
                  <MdOutlineMailOutline className='absolute top-3 left-3 text-xl text-gray-500'/>
                </div>
                <div className='w-full relative'>
                  <input type='number' placeholder='Employee Size' className='border-2 border-gray-300 rounded-lg p-2 pl-10 w-full focus:outline-blue-600'
                  required
                  name='employee_count'
                  value={details.count}
                  onChange={handleChange}/>
                  <PiUsersThreeLight className='absolute top-3 left-3 text-xl text-gray-500'/>
                </div>
                <div className='text-sm text-center text-gray-700 font-semibold'>
                  By clicking on proceed you will accept our
                  <br/><span className='text-sm text-blue-600 font-semibold cursor-pointer'>Terms & Conditions</span>
                </div>
                <div className='w-full pt-2 '>
                <button type='submit'
                  className='relative w-full  overflow-hidden flex items-center justify-center text-white rounded-md text-center px-5 py-2 border border-blue-500 gap-1 group cursor-pointer'>
                  <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>
                  <span className="absolute inset-0 bg-blue-500 transition-none lg:hidden "></span>
                      <div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Send</div>
                  </button>
                </div>
               </form>
            </div> 
        </div>
    </div>
  )
}

export default SignUp;