import Features from "@/section/Features";
import Hero from "@/section/Hero";
import InfoCards from "@/section/InfoCards";
import Benefits from "@/section/Benefits"
import React from "react";
import Workflow from "@/section/Workflow";

interface HomeProps {
    
}
 
const Home: React.FC<HomeProps> = () => {
    return ( <>
    <Hero/>
        <InfoCards />
        <Features/>
        <Benefits />
        <Workflow/>
    </> );
}
 
export default Home;