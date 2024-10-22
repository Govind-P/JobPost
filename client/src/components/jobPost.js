import React,{ useState} from 'react';
import backendApi from '../common/backendApi.js';
import { toast } from 'react-toastify';


import { MdOutlineClose } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

const JobPost = ({onClose}) => {
    const today = new Date().toISOString().split('T')[0];
    const [candidate,setCandidate]=useState('');
    const [job,setJob]=useState({
        title:'',
        description:'',
        experience:'',
        candidates:[],
        endDate:''
    });

    const handleClose=(item)=>{
        console.log(item);
        const index = job.candidates.indexOf(item);
        if (index !== -1) {
            job.candidates.splice(index, 1);
            setJob((prevJob) => ({
                ...prevJob,
                candidates: job.candidates,
            }));
        }
    }
    const handleCandidate = (e)=>{
        const {value}=e.target;
        setCandidate(value);
    }
    const handleChange = (e)=>{
        const {name,value}=e.target;
        setJob((prevJob) => ({
            ...prevJob,
            [name]: value
          }));
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && candidate) {
          setJob((prevJob) => ({
            ...prevJob,
            candidates: [...prevJob.candidates, candidate],
          }));
          setCandidate('');
        }
      };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await fetch(backendApi.jobPost.url,{
        method: backendApi.jobPost.method,
        credentials:'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(job)
        });
        const data=await res.json();
        if(data.success){
            toast.success(data.message);
            onClose();
        }
        else{
        toast.error(data.message);
        } 
    }


  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
    <div className='container w-3/4 md:w-2/3  md:max-h-4/5 h-3/4  flex flex-col items-end justify-start rounded-xl md:p-4 bg-slate-100 overflow-y-auto pb-4'>
        <div className='p-1 opacity-75'>
            <MdOutlineClose className='text-3xl cursor-pointer hover:text-blue-500 hover:rotate-90 duration-300 transition-all' 
            onClick={onClose}/>
        </div>
        <form className='h-full w-full flex flex-col gap-4 justify-start px-4 py-3 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 overflow-y-auto'
            onSubmit={handleSubmit}>
            <div className='flex flex-col md:flex-row w-full gap-4 justify-start items-center'>
                <label className='md:w-1/5 w-full text-left md:text-right'>Job Title</label>
                <input type="text" placeholder='Enter Job Title' className='border flex-1 w-full border-gray-500 p-2 rounded-md focus:outline-blue-500'
                required 
                onChange={handleChange}
                value={job.title}
                name="title"/>
            </div>
            <div className='flex flex-col md:flex-row w-full gap-4 justify-start items-center'>
                <label className='md:w-1/5 w-full text-left md:text-right'>Job Description</label>
                <textarea 
                type="text" 
                placeholder="Enter Job Description" 
                name="description"
                onChange={handleChange}
                value={job.description}
                required
                className="border flex-1 w-full border-gray-500 p-2 rounded-md focus:outline-blue-500 h-20 resize-none overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
                />
            </div>
            <div className='flex flex-col md:flex-row w-full gap-4 justify-start items-center'>
                <label className='md:w-1/5 w-full text-left md:text-right'>Experience Level</label>
                <div className='flex-1 w-full relative'>
                    <select className='border w-full border-gray-500 p-2 rounded-md focus:outline-blue-500 appearance-none relative'
                    name="experience"
                    onChange={handleChange}
                    required
                    value={job.experience}>
                    <option value="" disabled selected>Select Experience Level</option>
                    <option value="0-1 years">less than 1 year</option>
                    <option value="1-5 years">1-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value=">10 years">more than 10 years</option>
                    </select>
                    <FaCaretDown className='absolute text-2xl text-gray-600 inset-y-2 right-2 items-center pointer-events-none'/>
                </div>
            </div>
            <div className='flex flex-col md:flex-row w-full gap-4 justify-start items-center'>
                <label className='md:w-1/5 w-full text-left md:text-right'>Add Candidate</label>
                <div className='flex flex-col flex-1 w-full h-full'>
                    <input
                    type="email"
                    placeholder='Enter candidate Email'
                    className='border border-b-0 w-full border-gray-500 p-2 rounded-t-md focus:outline-blue-500'
                    name="candidate"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    value={candidate}
                    onChange={handleCandidate}
                    onKeyDownCapture={handleKeyPress}
                    />
                    <div className='max-h-32 w-full h-fit px-2 py-1 border border-t-0 border-gray-500 rounded-b-md flex items-center justify-start flex-wrap overflow-y-auto gap-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
                    {job.candidates.map((item, index) => {
                        return (
                        <div
                        key={index}
                        className='rounded-xl bg-slate-300 flex items-center justify-center w-fit h-fit py-1 px-2 gap-1'>
                            <FaUserCircle className='text-xl rounded-full' />
                            <div className='text-center w-full h-full pb-1'>{item}</div>
                            <MdOutlineClose className='text-xl text-center cursor-pointer hover:text-blue-500 hover:rotate-90 duration-700 transition-all' 
                            onClick={()=>{handleClose(item)}}/>
                        </div>
                        );
                    })}
                    </div>
                </div>   
            </div>
            <div className='flex flex-col md:flex-row w-full gap-4 justify-start items-center'>
                <label className='md:w-1/5 w-full text-left md:text-right'>End Date</label>
                <input 
                    type="date" 
                    required
                    name="endDate"
                    min={today}
                    value={job.endDate} 
                    onChange={handleChange}
                    className="border flex-1 w-full border-gray-500 p-2 rounded-md focus:outline-blue-500"
                />
            </div>
            <div className='flex w-full gap-4 justify-end items-center'>
                <button type='submit'
                className='relative w-fit overflow-hidden flex items-center justify-end text-white rounded-md text-center px-5 py-2 border border-blue-500 gap-1 group cursor-pointer'>
                    <span className="absolute inset-0 bg-blue-500 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-left z-0"></span>
                    <span className="absolute inset-0 bg-blue-500 transition-none lg:hidden"></span>
                    <div className='relative z-10 group-hover:text-white md:text-gray-900 text-white transition-all duration-300'>Send</div>
                </button>
            </div>
        </form>
    </div>
</div>


  )
}

export default JobPost;