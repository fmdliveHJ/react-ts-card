import { useState } from 'react';

import Terms from '@/components/apply/Terms';
import CardInfo from '@/components/apply/CardInfo';
import BasicInfo from '@/components/apply/BasicInfo';

import { TermsList } from '@/model/apply';

const Apply = () => {
  const [step, setStep] = useState(1);

  const handleTermsChange = (terms: TermsList['terms']) => {
    console.log(terms);
  };

  const handleBasicInfoChange = (
    info: Pick<TermsList, 'salary' | 'creditScore' | 'payDate'>
  ) => {
    console.log(info);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Terms onNext={handleTermsChange} />;
      case 1:
        return <BasicInfo onNext={handleBasicInfoChange} />;
      case 2:
        return <CardInfo />;
      default:
        return null;
    }
  };
  return <div>{renderStep()}</div>;
};

export default Apply;
