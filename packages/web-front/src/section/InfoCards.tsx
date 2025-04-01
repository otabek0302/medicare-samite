interface InfoCardsProps {}

const InfoCards: React.FC<InfoCardsProps> = () => {
  return (
    <div className="mt-10 px-4">
      <div className="md:flex gap-4">
        <div className="bg-[#34C38F] text-white p-8 rounded-lg flex-1">
          <h2 className="font-bold text-2xl mb-2">Reach Out to Us</h2>
          <p className="text-lg">
            Feel free to get in touch anytime. We&apos;re ready to assist you!
          </p>
        </div>

        <div className="bg-[#041150] text-white p-8 rounded-lg flex-1 mt-4 md:mt-0">
          <h2 className="font-bold text-2xl mb-2">24-Hour Service</h2>
          <p className="text-lg">
            We take pride in offering 24-hour medical services to ensure you
            receive the care you need, whenever you need it.
          </p>
        </div>

        <div className="bg-[#041150] text-white p-8 rounded-lg flex-1 mt-4 md:mt-0">
          <h2 className="font-bold text-2xl mb-2">Advanced Medical Technology</h2>
          <p className="text-lg">
            We utilize cutting-edge medical technology to deliver the highest
            quality care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
