import { Button } from "@/components/ui/button";
import React from "react";

interface HeroProps {
    
}
 
const Hero: React.FC<HeroProps> = () => {
    return (

        <>
        
            <div className="bg-[#041150] pt-7 px-2 md:flex items-center md:px-7 md:pb-20 lg:pb-0">
                
                <div>
                    <h2 className="text-xl text-white font-normal mt-3 md:text-2xl lg:text-2xl">Welcome to SAMIT</h2>
                    <h1 className="text-[#34C38F] text-3xl font-semibold mt-1 mb-4 md:text-4xl md:text-5xl">We Are Providing Best & Affordable Health Care.</h1>    
                    <p className="text-[16px] text-[#ffffff80]"> Experience Unmatched Healthcare Excellence at  SAMIT : Comprehensive Medical Services, Advanced Hospital Management, and Compassionate Patient Care for a Healthier Tomorrow</p>
            
<div className="flex justify-start mt-5 gap-2">
            <Button className="w-[170px] border border-white text-center text-[16px] h-[40px] bg-white text-[#041150] font-medium cursor-pointer transition hover:bg-[#041150] hover:text-white hover:shadow-lg duration-200">
              Get Started
            </Button>
            <Button className="w-[170px] border text-[16px] border-white text-center h-[40px] bg-[#10101000] font-medium cursor-pointer transition hover:bg-white hover:text-[#041150] hover:shadow-lg duration-200">
              Get Appointment
            </Button>
          </div>                </div>
            
                <img src="/img.png" alt="photo" className="w-[80%]  mt-12 mx-auto md:w-[50%] md:mt-0 lg:w-[80%]" />
                
            </div>


            
        </>
      );
}
 
export default Hero;