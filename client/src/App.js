
import './App.css';
import { Outlet } from 'react-router-dom';
import Context from './context/index.js';
import { ToastContainer} from 'react-toastify';
import Header from './components/header.js';
import 'react-toastify/dist/ReactToastify.css';
import {  useEffect } from'react';
import { useDispatch } from'react-redux';
import { setLoggedIn, setRecruiterDetails, setToken } from './store/recruiterSlice.js';
import backendApi from './common/backendApi.js';

function App() {
  const dispatch = useDispatch();
  const fetchRecruiterData = async () => {
    const res = await fetch(backendApi.userDetails.url, {
      method: backendApi.userDetails.method,
      credentials: 'include'
    });
    const data = await res.json();
    if(data.success){
      dispatch(setRecruiterDetails(data.data));
      dispatch(setToken(localStorage.getItem('token')));
      dispatch(setLoggedIn(true));
    }
  }

  useEffect(() => {
    fetchRecruiterData();
  }, []);
  return (
    <>
    <Context.Provider value={{
      fetchRecruiterData
    }}>
      <ToastContainer />
      <main className=' h-screen bg-white shadow-xl'>
        <Header/>
        <Outlet/>
      </main>
    </Context.Provider>
    </>
  );
}

export default App;
