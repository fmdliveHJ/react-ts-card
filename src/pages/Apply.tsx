import { useState } from 'react';

import Terms from '@/components/apply/Terms';
import CardInfo from '@/components/apply/CardInfo';
import BasicInfo from '@/components/apply/BasicInfo';

const Apply = () => {
  const [step, setStep] = useState(0);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Terms />;
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
