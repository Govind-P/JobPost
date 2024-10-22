
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading.js';

//icons
import { FaRegUser } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";

const Profile = () => {
  const isLoggedIn = useSelector(state => state.recruiter.isLoggedIn);
  const recruiter=useSelector(state => state.recruiter.recruiter);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

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
    <div className='max-h-screen h-full w-full overflow-y-auto p-4'>
        <div className='flex flex-col justify-center items-center h-full gap-3'>
          <div className=" w-fit h-fit rounded-full opacity-90 bg-gray-300 shadow-md"><FaRegUser className='p-10 text-9xl text-blue-700' /></div>
          <div className="text-blue-500 font-bold text-2xl">{recruiter.name}</div>
          <div className='flex items-center justify-center w-fit h-fit gap-2'>
            <FaRegBuilding className='text-blue-400 text-lg'/>
            <div className="text-gray-800 font-semibold text-xl">{recruiter.company}</div>
          </div>
          <div className='flex items-end justify-center w-fit h-fit gap-2'>
            <MdOutlineMailOutline className='text-blue-400 text-xl'/>
            <div className="text-gray-800 font-semibold text-xl">{recruiter.email}</div>
          </div>
          <div className='flex items-end justify-center w-fit h-fit gap-2'>
            <FiPhone className='text-blue-400 text-xl'/>
            <div className="text-gray-800 font-semibold text-xl">{recruiter.mobile}</div>
          </div>
          <div className='flex items-center justify-center w-fit h-fit gap-2'>
            <PiUsersThreeLight className='text-blue-400  text-xl'/>
            <div className="text-gray-800 font-semibold text-xl">{recruiter.employee_count}</div>
          </div>
        </div>
    </div>
  );
}

export default Profile;