import { useTranslation } from "react-i18next";

interface InfoCardsProps {}

const InfoCards: React.FC<InfoCardsProps> = () => {

  const { t } = useTranslation();

  return (
    <div className="mt-10 px-2 text-center">
      <div className="max-w-4xl mx-auto mb-10">
      <h2 className="text-[#34C38F] font-bold text-4xl mb-4" dangerouslySetInnerHTML={{ __html: t("info_cards_title") }} />
        <p className="text-gray-600 text-lg">
        {t("info_cards_subtitle_1")}
        </p>
        <p className="text-gray-600 text-lg">
        {t("info_cards_text_1")}  
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-[#4a89ff] text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
          </div>
          <h2 className="font-bold text-3xl mb-3 text-start">{t("info_cards_subtitle_2")}</h2>
          <p className="text-sm text-start">
          {t("info_cards_text_2")}
          </p>
        </div>

        <div className="bg-[#215bff] text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
          </div>
          <h2 className="font-bold text-3xl mb-3 text-start">{t("info_cards_subtitle_3")}</h2>
          <p className="text-sm text-start">
          {t("info_cards_text_3")}
          </p>
        </div>

        <div className="bg-[#0828a7] text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
          </div>
          <h2 className="font-bold text-3xl mb-3 text-start">{t("info_cards_subtitle_4")}</h2>
          <p className="text-sm text-start">
          {t("info_cards_text_4")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;