interface InfoCardsProps {}

const InfoCards: React.FC<InfoCardsProps> = () => {
  return (
    <div className="mt-10 px-2 text-center">
      <div className="max-w-4xl mx-auto mb-10">
        <h2 className="text-[#34C38F] font-bold text-4xl mb-4">Why Choose Our Hospital?</h2>
        <p className="text-gray-600 text-lg">
          At SAMIT, we understand that your health and well-being are of paramount importance.
        </p>
        <p className="text-gray-600 text-lg">
          Here’s why we believe you should choose us for your medical needs:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-[#4a89ff] text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
          </div>
          <h2 className="font-bold text-3xl mb-3 text-start">Personalized Care</h2>
          <p className="text-sm text-start">
            At SAMIT, we prioritize your health and well-being above all else. Our hospital offers
            comprehensive medical services tailored to meet your individual needs, ensuring you receive
            the highest quality of care at every step of your journey.
          </p>
        </div>

        <div className="bg-[#215bff] text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
          </div>
          <h2 className="font-bold text-3xl mb-3 text-start">Expert Team</h2>
          <p className="text-sm text-start">
            With a dedicated team of experienced healthcare professionals, including doctors, nurses, and
            support staff, we are committed to providing you with personalized attention and expert medical
            guidance. You can trust our skilled team to deliver compassionate care and support throughout your
            treatment.
          </p>
        </div>

        <div className="bg-[#0828a7] text-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
          </div>
          <h2 className="font-bold text-3xl mb-3 text-start">Cutting-Edge Facilities</h2>
          <p className="text-sm text-start">
            At SAMIT, we prioritize your health and well-being above all else. Our hospital offers
            comprehensive medical services tailored to meet your individual needs, ensuring you receive
            the highest quality of care at every step of your journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;