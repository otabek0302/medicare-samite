import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import React from "react";

interface HeroProps {
    
}
 
const Hero: React.FC<HeroProps> = () => {

  const { t } = useTranslation();

    return (

        <>
        <hr />
            <div className="bg-[#041150] pt-7 px-2 md:flex items-center md:px-7 md:pb-20 lg:pb-0">
                
                <div>
                    <h2 className="text-xl text-white font-normal mt-3 md:text-2xl lg:text-2xl">{t("welcome")}</h2>
                    <h1 className="text-[#34C38F] text-3xl font-semibold mt-1 mb-4 md:text-4xl lg:text-5xl">{t("headline")} </h1>    
                    <p className="text-[16px] text-[#ffffff80]">{t("description")}</p>
            
<div className="flex justify-start mt-5 gap-2">
            <Button className="w-[170px] border border-white text-center text-[16px] h-[40px] bg-white text-[#041150] font-medium cursor-pointer transition hover:bg-[#041150] hover:text-white hover:shadow-lg duration-200">
            {t("get_started")}
            </Button>
            <Button className="w-[170px] border text-[16px] border-white text-center h-[40px] bg-[#10101000] font-medium cursor-pointer transition hover:bg-white hover:text-[#041150] hover:shadow-lg duration-200">
            {t("get_appointment")}
            </Button>
          </div>                </div>
            
                <img src="/img.png" alt="photo" className="w-[80%]  mt-12 mx-auto md:w-[50%] md:mt-0 lg:w-[80%]" />
                
            </div>


            
        </>
      );
}
 
export default Hero;