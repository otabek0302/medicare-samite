import React from "react";
import { useTranslation } from "react-i18next";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return ( 
        <div className="bg-[#041150] w-full text-white font-bold flex items-center justify-center py-[10px] px-5 gap-9 md:justify-around">
            <div className="flex md:gap-5">
                <img src="/logo.png" alt="logo.png" className="w-[40px] h-[32px]" />
                <h1>{t("title")}</h1>
            </div>

            <Select onValueChange={changeLanguage}>
                <SelectTrigger className="w-[80px] bg-white text-black ml-auto">
                    <SelectValue placeholder={t("language")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ru">RU</SelectItem>
                    <SelectItem value="uz">UZ</SelectItem>
                    <SelectItem value="en">EN</SelectItem>
                </SelectContent>
            </Select> 
        </div>
    );
}

export default Header;
