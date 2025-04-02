import React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-[#020a40] text-white mt-10 p-6 md:p-10">
            <div className="container mx-auto md:flex flex-row md:justify-start gap-40 items-start text-left">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-xl font-bold flex gap-2 items-center">
                        <img src="/logo.png" alt="" className="w-[50px]" /> SAMIT
                    </h2>
                    <p className="text-sm mt-6 font-medium">&copy; 2024 SAMIT. {t("footer_rights_reserved")}</p>
                    <div className="flex gap-3 my-3">
                        <img src="facebook.png" alt="facebook" className="bg-white rounded-4xl" />
                        <img src="twitter.png" alt="twitter" className="bg-white rounded-4xl" />
                        <img src="whatsapp.png" alt="whatsapp" className="rounded-4xl" />
                    </div>
                </div>
                <div className="mb-6 md:mb-0">
                    <h3 className="text-xl font-semibold">{t("footer_hospital")}</h3>
                    <ul className="text-lg space-y-1">
                        <li><a href="#" className="hover:underline">{t("footer_about_us")}</a></li>
                        <li><a href="#" className="hover:underline">{t("footer_departments")}</a></li>
                        <li><a href="#" className="hover:underline">{t("footer_doctors")}</a></li>
                        <li><a href="#" className="hover:underline">{t("footer_contact_us")}</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-semibold">{t("footer_support")}</h3>
                    <ul className="text-lg space-y-1">
                        <li><a href="#" className="hover:underline">{t("footer_terms_of_service")}</a></li>
                        <li><a href="#" className="hover:underline">{t("footer_legal")}</a></li>
                        <li><a href="#" className="hover:underline">{t("footer_privacy_policy")}</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;