import React from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqProps {}

const Faq: React.FC<FaqProps> = () => {
  const { t } = useTranslation();

  const faqs = [
    { question: t("faq_question_1"), answer: t("faq_answer_1") },
    { question: t("faq_question_2"), answer: t("faq_answer_2") },
    { question: t("faq_question_3"), answer: t("faq_answer_3") },
    { question: t("faq_question_4"), answer: t("faq_answer_4") },
    { question: t("faq_question_5"), answer: t("faq_answer_5") },
    { question: t("faq_question_6"), answer: t("faq_answer_6") },
    { question: t("faq_question_7"), answer: t("faq_answer_7") },
    { question: t("faq_question_8"), answer: t("faq_answer_8") },
    { question: t("faq_question_9"), answer: t("faq_answer_9") },
    { question: t("faq_question_10"), answer: t("faq_answer_10") },
  ];

  return (
    <section className="py-16 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#34C38F] mb-6">{t("faq_title")}</h2>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-300">
              <AccordionTrigger className="py-4 text-lg font-medium text-gray-800 cursor-pointer hover:text-[#34C38F] hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-md p-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;