import React from "react";
import { CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface FeaturesProps {
    
}
 
const Features: React.FC<FeaturesProps> = () => {
    return (  
        <>
        
            <div className="mt-20 md:flex justify-center bg-gray-100 pt-5">
                <img src="/doctor-2.png" alt="doc" className="w-[70%] mx-auto md:w-[40%] lg:w-[30%] px-3" />


             <div className="bg-gray-100 py-10  w-[100%] px-6 sm:px-10 md:w-[55%]">
                    <div className="max-w-3xl mx-auto text-start text-[#4A5568] lg:text-left">
                     <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2">
          We are always ensure best <span className="text-[#34C38F]">Medical treatment</span> for Your Health
        </h2>
        <p className="text-[#4A5568] mb-6">
          Pain Management Treatment Options Pain and symptom management is one of the primary goals of palliative and hospice care
        </p>

        <ul className="space-y-4 mb-6">
          {[
            'Top-tier Specialists in Healthcare.',
            'Advanced Doctor Services Available.',
            'Discounts Offered on All Medical Treatments.',
            'Easy and Swift Enrollment Process.'
          ].map((text, index) => (
            <li key={index} className="flex items-center text-[#4A5568] text-sm sm:text-base">
              <CheckCircle className="text-green-600 w-5 h-5 mr-3" />
              {text}
            </li>
          ))}
        </ul>

        <Button className="flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition px-6 py-3 rounded-lg w-full sm:w-auto">
          <Calendar className="w-5 h-5" />
          Make Appointment
        </Button>
      </div>
    </div>
            </div>
        </>
    );
}
 
export default Features;