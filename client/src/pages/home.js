import React,{useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const isLoggedIn = useSelector((state) => state.recruiter.isLoggedIn);
  const navigate=useNavigate();
  useEffect(() => {
    if(isLoggedIn){
      navigate('/dashboard',{replace: true});
    }
  }, [isLoggedIn]);
  return (
    <div className='container mx-auto w-screen min-h-screen h-full pt-20 lg:pt-16 overflow-y-auto'>
        <div className='flex h-full flex-col lg:flex-row items-center justify-center gap-3 '>
          <div className='h-1/3 lg:h-full  text-center lg:w-1/2 w-full flex items-center justify-center '>
            <div className='h-fit text-3xl font-serif text-blue-700 px-3 '>
              Welcome to Cuvette<br/>
                <span className='h-fit text-lg font-serif text-gray-950 px-3 '>Your ultimate platform for connecting top talent with the best opportunities. Whether you're a recruiter looking to fill your next position , we’ve got you covered.
                <br/>
                <span className='h-fit text-lg font-serif text-blue-800 px-3 '>Start exploring today and take the next step in your hiring or career journey!</span>
                </span>
                </div>
            </div>
          <div className='md:h-fit lg:h-full  lg:w-1/2 w-full flex items-center justify-center py-2 lg:p-8'>
            <div className='flex py-7 md:px-6 px-4 flex-col w-3/4 md:w-2/3 lg:w-3/4 h-fit items-center justify-center gap-2 rounded-lg  border-2 border-violet-500'>
            <div className='py-2 text-sm text-blue-900'>Already have an account</div>
            <div className='w-full pt-2 '>
              <Link to='/login'
                className='relative w-full  overflow-hidden flex items-center justify-center text-white rounded-md text-center px-5 py-2 border border-blue-500 gap-1 group cursor-pointer'>
                <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>
                <span className="absolute inset-0 bg-blue-500 transition-none lg:hidden "></span>
                <div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Login</div>
              </Link>
            </div>
            <div className='py-2 text-sm text-blue-900'>else</div>
            <div className='w-full pt-2 '>
                <Link to='/signup'
                className='relative w-full  overflow-hidden flex items-center justify-center text-white rounded-md text-center px-5 py-2 border border-blue-500 gap-1 group cursor-pointer'>
                <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>
                <span className="absolute inset-0 bg-blue-500 transition-none lg:hidden "></span>
                <div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Sign Up</div>
            </Link>
        </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home