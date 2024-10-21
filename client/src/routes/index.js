import { createBrowserRouter} from "react-router-dom";
import App from "../App.js";
import Home from "../pages/home.js";
import Login from "../pages/login.js";
import SignUp from "../pages/signup.js";
import Validate from "../pages/validate.js";
import Dashboard from "../pages/dashboard.js";
import HomeD from "../components/homeD.js";
import ScheduleD from "../components/scheduleD.js";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path: "",
                element:<Home/>,
            },
            {
                path: "/login",
                element:<Login/>,
            },
            {
                path: "/signup",
                element:<SignUp/>,
            },
            {
                path: "/validate",
                element:<Validate/>,
            },
            {
                path: "/dashboard",
                element:<Dashboard/>,
                children:[
                    {
                        path:"",
                        element:<HomeD/>
                    },
                    {
                        path:"schedules",
                        element:<ScheduleD/>
                    }
                ]
            },

        ]
    }
]);


export default router;