import React from 'react';

const Page = () => {
  return (
    <div className="p-5 m-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms and Conditions for Guarantee</h1>
      <ul className="list-disc list-inside space-y-4 text-gray-700">
        <li className="text-base md:text-lg">
          The only guarantee in the production of Dream Fan will start from the purchasing date of motor only.
        </li>
        <li className="text-base md:text-lg">
          In the form of claim, products will not be changed or exchanged.
        </li>
        <li className="text-base md:text-lg">
          Within a year of purchasing, if any kind of fault appears, then only the motor will be changed.
          <ul className="list-disc list-inside ml-6 mt-2 space-y-2"> <br/>
            B: The next year only the service will be free.<br/>
            C: The buyer will bear the cost of shipping the fan to and from the factory.
          </ul>
        </li>
        <li className="text-base md:text-lg">
          In the case of any accident or personal repair, guarantee cannot be given for a defect caused by a miscarriage or negligence of the buyer.
        </li>
        <li className="text-base md:text-lg">
          There is no guarantee that the motor will burn out due to water in the motor and for the capacitor in case of burn out.
        </li>
        <li className="text-base md:text-lg">
          In the case of a claim, it is important to show the receipt of the Dealer or Distributor.
        </li>
        <li className="text-base md:text-lg">
          A fan that has been running/working for a year will not be replaced; it will be repaired.
        </li>
        <li className="text-base md:text-lg">
          Contact the dealer to avail of the guarantee for one year. You can send it directly to the company for the next period.
        </li>
      </ul>
    </div>
  );
};

export default Page;
