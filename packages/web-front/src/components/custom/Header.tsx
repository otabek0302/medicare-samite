import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
 
const Header: React.FC = () => {
    return ( <>
    <div>

<div className="bg-[#041150] w-full text-white font-bold flex items-center justify-center py-[10px] px-5 gap-9 md:justify-around ">
    <div className="flex md:gap-5">
    <img src="/logo.png" alt="logo.png" className="w-[40px] h-[32px]" />
    <h1>SAMIT</h1>
    </div>

    <Select>
  <SelectTrigger className="w-[80px] bg-white text-black ml-auto">
    <SelectValue placeholder="EN" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">RU</SelectItem>
    <SelectItem value="dark">UZ</SelectItem>
    <SelectItem value="system">EN</SelectItem>
  </SelectContent>
</Select>
</div>

    </div>
    </> );
}
 
export default Header;