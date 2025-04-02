import React from "react";
const Footer: React.FC = () => {
    return ( <>
  <footer className="bg-[#020a40] text-white mt-10 p-6 md:p-10">
      <div className="container mx-auto  md:flex flex-row md:justify-start gap-40 items-start text-left">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold flex gap-2 items-center"><img src="/logo.png" alt=""  className="w-[50px]"/> SAMIT</h2>
          <p className="text-sm mt-6 font-medium">&copy; 2024 SAMIT. All rights reserved</p>
          <div className="flex gap-3 my-3">
          
                        <img src="facebook.png" alt="facrbook" />
                        <img src="twitter.png" alt="twitter" />
                        <img src="watsap.png" alt="watsap" />
          </div>
          
        </div>
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold">Hospital</h3>
          <ul className="text-lg space-y-1">
            <li><a href="#" className="hover:underline">About us</a></li>
            <li><a href="#" className="hover:underline">Departments</a></li>
            <li><a href="#" className="hover:underline">Doctors</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Support</h3>
          <ul className="text-lg space-y-1">
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Legal</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      
    </footer>    </> );
}
 
export default Footer;