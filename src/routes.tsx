import { Navigate, Outlet, createBrowserRouter, useNavigate } from "react-router-dom";
import LayoutWebsite from "./components/layouts/LayoutWebsite";
import LayoutAdmin from "./components/layouts/LayoutAdmin";
import Dashboard from "./pages/admin/dashboard";
import AdminProduct from "./pages/admin/product/productList";
import AddProduct from "./pages/admin/product/add";
import UpdateProduct from "./pages/admin/product/update";
import Signin from "./pages/auth/signin";
import Signup from "./pages/auth/signup";
import { useEffect } from "react";
const PrivateRoute=({isAuth}:any)=>{
    const navigate=useNavigate();
    useEffect(()=>{
        if(!isAuth){
            navigate("/signin");
        }
    },[isAuth]);
    return isAuth ? <Outlet/>:<Navigate to="/signin"/>
}
export const router = createBrowserRouter([
    {path:"/", element:
    <div>
      <LayoutWebsite />  
      <Outlet/>
    </div>
    ,children:[
        {path:"/signin",element:<Signin/>},
        {path:"/signup",element:<Signup/>},
    ]},
   
    {path:"/admin",element:<PrivateRoute isAuth={true}/>,children:[
        {element:<LayoutAdmin/>,children:[
        {index:true, element: <Navigate to="dashboard"/>},
        {path:"dashboard", element: <Dashboard/>},
        {path:"product", element:<AdminProduct/>},
        {path:"product/add", element:<AddProduct/>},
        {path:"product/:idProduct/edit", element:<UpdateProduct/>},
        ]}
    ]},
    { path: "*", element: "Not Found Page" },
])