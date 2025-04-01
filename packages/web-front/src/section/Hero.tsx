import { Button } from "@/components/ui/button";
import React from "react";

interface HeroProps {
    
}
 
const Hero: React.FC<HeroProps> = () => {
    return (

        <>
        
            <div className="flex flex-col bg-[#041150] pt-7 px-2">
                
                <div>
                    <h2 className="text-xl text-white font-normal mt-3">Welcome to SAMIT</h2>
                    <h1 className="text-[#34C38F] text-3xl font-semibold mt-1 mb-4">We Are Providing Best & Affordable Health Care.</h1>    
                    <p className="text-[16px] text-[#ffffff80]"> Experience Unmatched Healthcare Excellence at  SAMIT : Comprehensive Medical Services, Advanced Hospital Management, and Compassionate Patient Care for a Healthier Tomorrow</p>
               
                    <div className="flex justify-start mt-5 gap-5"><Button className="w-[170px] border border-white text-center text-sm h-[40px] bg-white text-[#041150] font-medium">Get Started</Button> <Button className="w-[170px] border text-sm border-white text-center h-[40px] bg-[#10101000] font-medium">Get Appointment</Button></div> </div>
            
            </div>

            
        </>
      );
}
 
export default Hero;