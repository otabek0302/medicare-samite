import React from "react";
 
const Footer: React.FC = () => {
    return ( <>
 <footer className="bg-[#020a40] text-white p-6 md:p-10">
      <div className="container mx-auto text-start flex flex-col md:flex-row md:justify-between items-center md:text-left">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-bold">SAMIT</h2>
          <p className="text-sm">&copy; 2024 SAMIT. All rights reserved</p>
          <div className="flex justify-center md:justify-start gap-3 mt-2">
            <a href="#" className="text-lg"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-lg"><i className="fab fa-whatsapp"></i></a>
            <a href="#" className="text-lg"><i className="fab fa-twitter"></i></a>
          </div>
          <div className="flex justify-center md:justify-start gap-2 mt-3">
            <img src="google-play.png" alt="Google Play" className="h-10" />
            <img src="app-store.png" alt="App Store" className="h-10" />
          </div>
        </div>
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold">Hospital</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">About us</a></li>
            <li><a href="#" className="hover:underline">Departments</a></li>
            <li><a href="#" className="hover:underline">Doctors</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Support</h3>
          <ul className="text-sm space-y-1">
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Legal</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <a href="#" className="bg-green-500 p-3 rounded-full shadow-lg">
          <i className="fab fa-whatsapp text-white text-2xl"></i>
        </a>
      </div>
    </footer>    </> );
}
 
export default Footer;