import Features from "@/section/Features";
import Hero from "@/section/Hero";
import InfoCards from "@/section/InfoCards";
import React from "react";

interface HomeProps {
    
}
 
const Home: React.FC<HomeProps> = () => {
    return ( <>
    <Hero/>
        <InfoCards />
        <Features/>
    </> );
}
 
export default Home;