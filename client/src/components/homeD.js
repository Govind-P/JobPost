import React,{useEffect,useState} from 'react'
import JobPost from './jobPost';

const HomeD = () => {
    const [visible,setvisible] =useState(false);

    const onClose=()=>{
        setvisible(false);
    }
  return (
    <div className='container mx-auto flex flex-col w-full h-full items-start justify-start py-4 px-3'>
        <div className='relative overflow-hidden  flex items-center justify-center text-white rounded-md text-center px-5 py-2  z-0 border border-blue-500 gap-1 group cursor-pointer'
        onClick={()=>setvisible(true)}>
        <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left"></span>
        <span className="absolute inset-0 bg-blue-500 transition-none lg:hidden "></span>
            <div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Create Interview</div>
        </div>
        <div className='w-full h-full'>
        {
            visible && (
                <div className='z-10 w-full flex-1 h-full pb-10 mt-4 flex items-start justify-start '>
                    <JobPost onClose={onClose}/>
                </div>
            )
        }
        </div>
    </div>
  )
}

export default HomeD;