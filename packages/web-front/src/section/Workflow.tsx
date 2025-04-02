import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Stethoscope, Pill, Users } from "lucide-react";

interface WorkflowProps {
    
}
 
const Workflow: React.FC<WorkflowProps> = () => {

     const steps = [
    { icon: <Calendar size={40} />, title: "Book An Appointment" },
    { icon: <Stethoscope size={40} />, title: "Conduct Checkup" },
    { icon: <Users size={40} />, title: "Perform Treatment" },
    { icon: <Pill size={40} />, title: "Prescribe & Payment" },
  ];

    return (  
        <>
            <div className="px-2 md:px-7">
                
               <div className="container mx-auto py-10 mt-10">
            <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="lg:w-1/2">
                    <h3 className="text-green-500 text-xl font-semibold mb-2">Our Operational Method</h3>
                    <h2 className="text-4xl text-[#1A202C] font-semibold leading-tight mb-0 md:text-[45px]">
                        A Comprehensive Guide to Your Health
                    </h2>
                </div>
                <div className="lg:w-1/2">
                    <p className="text-gray-700">
                        We serve as your reliable one-stop destination for all your healthcare needs. Our extensive directory is crafted to offer convenient access to a diverse array of healthcare services and providers, guaranteeing optimal care for you and your family.
                    </p>
                </div>
            </div>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 md:grid-cols-4">
      {steps.map((step, index) => (
        <Card key={index} className="flex flex-col items-center p-4 shadow-lg">
          <div className="mb-4 text-blue-500">{step.icon}</div>
          <CardContent className="text-center text-lg font-semibold">
            {step.title}
          </CardContent>
        </Card>
      ))}
            </div>
                    </div>

        </div>
        </>
    );
}
 
export default Workflow;