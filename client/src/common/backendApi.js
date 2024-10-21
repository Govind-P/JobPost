

const backend=process.env.REACT_APP_BACKEND_URL

const backendApi={
    loginEmail:{
        url:`${backend}/loginEmail`,
        method:'POST',
    },
    loginEmailOtp:{
        url:`${backend}/loginOtpEmail`,
        method:'POST',
    },
    loginMobile:{
        url:`${backend}/loginMobile`,
        method:'POST',
    },
    loginMobileOtp:{
        url:`${backend}/loginOtpMobile`,
        method:'POST',
    },
    signup:{
        url:`${backend}/signup`,
        method:'POST',
    },
    validateEmail:{
        url:`${backend}/emailVerify`,
        method:'POST',
    },
    validateMobile:{
        url:`${backend}/mobileVerify`,
        method:'POST',
    },
    userDetails:{
        url:`${backend}/userDetails`,
        method:'GET',
    },
    logout:{
        url:`${backend}/logout`,
        method:'GET',
    },
    proceedDashboard:{
        url:`${backend}/proceedDashboard`,
        method:'GET',
    },
    jobPost:{
        url:`${backend}/jobpost`,
        method:'POST',
    },
    getJob:{
        url:`${backend}/getJobs`,
        method:'GET',
    }
    
}

export default backendApi;