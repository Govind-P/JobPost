import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import backendApi from '../common/backendApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//icons
import { FaUserAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa6"; 
import { setLoggedIn ,setRecruiterDetails,setToken} from '../store/recruiterSlice';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux';

const Header = () => {
    const [visible,setvisible]=useState(false);
    const isLoggedIn = useSelector(state=>state.recruiter.isLoggedIn);
    const user=useSelector(state=>state.recruiter.recruiter);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleUser=()=>{
        setvisible(!visible);
    }

    const handleLogout=async()=>{
        const res=await fetch(backendApi.logout.url, {
          method:backendApi.logout.method,
          credentials: 'include',
        });
        const data=await res.json();
        if(data.success){
          toast.success(data.message);
          navigate('/login',{replace:true});
          dispatch(setRecruiterDetails(null));
          dispatch(setToken(''));
          dispatch(setLoggedIn(false));
          localStorage.removeItem('token');
        }
        else{
          toast.error(data.message);
        }
      }
  return (
    <div className='fixed w-screen h-20 lg:h-16  rounded-md bg-white shadow-md z-50'>
        <div className=' flex items-center justify-between h-full w-full px-7 lg:px-10'>
            <Link to={'/'} className='h-fit px-3 py-2 w-fit' >
            <img src={'/cuvetteLogo.png'} alt={'Logo'} width={90} height={30}/>
            </Link>
            <div className='flex items-center justify-center h-fit gap-3'>
                <Link className='h-fit w-fit text-lg md:text-xl  rounded-lg py-2 px-3 font-normal '>
                    Contact
                </Link>
                {isLoggedIn && (<div className='relative h-fit w-fit text-md  cursor-pointer rounded-lg py-1 px-3 border border-gray-500 text-gray-700 flex items-center justify-center gap-3'
                onClick={handleUser}>
                    <FaUserAlt className='text-gray-600'/>
                    <div className='md:flex hidden'>{user.name}</div>
                    <FaAngleDown className='text-gray-600'/>
                    {visible && (
                        <div className='absolute right-0  lg:top-14 top-10 w-30 md:w-40 bg-inherit  rounded-md  flex flex-col items-start justify-start gap-2 '>
                            <div className='rounded-md shadow-md w-full px-3 py-2 bg-slate-200 flex items-center justify-start gap-2'>
                                <CgProfile className='text-xl '/>
                                <Link className='h-fit w-full text-lg md:text-lg font-normal ' to={'profile'}>Profile</Link>
                            </div>
                            <div className='cursor-pointer rounded-md shadow-md w-full px-3 py-2 bg-slate-200 flex items-center justify-start gap-2'
                            onClick={handleLogout}>
                                <AiOutlineLogout className='text-xl font-semibold'/>
                                <div className='h-fit w-full bg-slate-200 text-lg' >Logout</div>
                            </div>
                        </div>
                    )}
                </div>)}
            </div>
        </div>
    </div>
  )
}

export default Header;