import { useTranslation } from "react-i18next";

interface InfoCardsProps {}

const InfoCards: React.FC<InfoCardsProps> = () => {

  const { t } = useTranslation();  

  return (
    <div className="mt-10 px-2 md:px-7">
      <div className="md:flex gap-4">
        <div className="bg-[#34C38F] text-white p-8 rounded-lg flex-1">
          <h2 className="font-bold text-2xl mb-2">{t("reach_out_title")}</h2>
          <p className="text-lg">
          {t("reach_out_text")}
          </p>
        </div>

        <div className="bg-[#041150] text-white p-8 rounded-lg flex-1 mt-4 md:mt-0">
          <h2 className="font-bold text-2xl mb-2">{t("service_title")}</h2>
          <p className="text-lg">
          {t("service_text")}
          </p>
        </div>

        <div className="bg-[#041150] text-white p-8 rounded-lg flex-1 mt-4 md:mt-0">
          <h2 className="font-bold text-2xl mb-2">{t("tech_title")}</h2>
          <p className="text-lg">
          {t("tech_text")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
