import React, { useEffect,useState } from 'react';
import { IoMdHome } from "react-icons/io";
import { AiFillSchedule } from "react-icons/ai";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading.js';

const Dashboard = () => {
  const isLoggedIn=useSelector(state=>state.recruiter.isLoggedIn);
  const navigate=useNavigate();
  const [isLoading,setLoading] = useState(false);

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/login',{replace:true});
    }
  },[isLoggedIn,navigate]);


  return (
    <div className='w-screen h-screen pt-20 lg:pt-16 flex items-start justify-start'>
        <div className='fixed lg:top-16 top-20  h-full shadow-md w-12 bg-slate-200'>
            <div className='z-5 flex flex-col items-center justify-center gap-5 pt-6 text-gray-500'>
                <Link to={''}><IoMdHome size={24} className='text-2xl cursor-pointer hover:text-gray-700' title='Home'/></Link>
                <Link to={'schedules'}><AiFillSchedule size={24} className='text-xl cursor-pointer hover:text-gray-700' title='Schedule'/></Link>
            </div>    
        </div>
        <div className='flex flex-1 w-full h-full items-start pl-16 pr-3 py-4'>
            <Outlet />
        </div>
    </div>
  )
}

export default Dashboard;