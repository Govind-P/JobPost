import { FaCalendarTimes } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/loading.js';
import backendApi from '../common/backendApi.js'; 
import moment from 'moment';

const ScheduleD = () => {
  const [jobs, setJobs] = useState([]);
  const isLoggedIn = useSelector(state => state.recruiter.isLoggedIn);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(backendApi.getJob.url, {
          method: backendApi.getJob.method,
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
          setJobs(data.data);
        } else {
          console.log('Error:', data.message);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchJobs(); // Call the async function
  }, []);

  if (isLoading) {
    return <Loading />; // Show loading component
  }

  return (
    <div className='max-h-screen h-full w-full overflow-y-auto p-4'>
      {jobs.length === 0 ? ( // Check if jobs array is empty
        <div className='flex flex-col justify-center items-center h-full'>
          <FaCalendarTimes className='text-6xl text-gray-400 mb-4' />  {/* Icon for no schedule */}
          <p className='text-xl font-semibold text-gray-600'>No schedule available</p>  {/* Message */}
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {jobs.map((card, index) => (
            <div 
              key={index} 
              className='border rounded-lg p-4 bg-white shadow-md h-60 flex flex-col justify-between'
            >
              <h2 className='text-xl font-bold mb-2 text-blue-500'>{card.title}</h2>
              <p className='line-clamp-2 mb-2'>{card.description}</p>  {/* Clamps the description to 2 lines */}
              <div>
                <p className='font-semibold'>Role: <span className='font-normal'>{card.role}</span></p>
                <p className='font-semibold'>End Date: <span className='font-normal'>{moment(card.endDate).format('YYYY-MM-DD HH:mm:ss')}</span></p>
                <p className='font-semibold'>Experience: <span className='font-normal'>{card.experience}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduleD;

