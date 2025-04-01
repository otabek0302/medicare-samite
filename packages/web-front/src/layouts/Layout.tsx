import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import React from "react";
import { Outlet } from "react-router-dom";

 
const Layout: React.FC = () => {
    return ( 
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
     );
}
 
export default Layout;