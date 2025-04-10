import { useState } from 'react';

import Terms from '@/components/apply/Terms';
import CardInfo from '@/components/apply/CardInfo';
import BasicInfo from '@/components/apply/BasicInfo';

const Apply = () => {
  const [step, setStep] = useState(0);

  const handleTermsChange = (terms: string[]) => {
    console.log(terms);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Terms onNext={handleTermsChange} />;
      case 1:
        return <CardInfo />;
      case 2:
        return <BasicInfo />;
      default:
        return null;
    }
  };
  return <div>{renderStep()}</div>;
};

export default Apply;
