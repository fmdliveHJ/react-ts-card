import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Terms from '@/components/apply/Terms';
import CardInfo from '@/components/apply/CardInfo';
import BasicInfo from '@/components/apply/BasicInfo';

import { TermsList, APPLY_STATUS } from '@/model/apply';
import { useUser } from '@/hooks/auth/useUser';

const ApplyIndex = ({ onSubmit }: { onSubmit: (terms: TermsList) => void }) => {
  const user = useUser();
  const { id } = useParams() as { id: string };
  const [step, setStep] = useState(0);
  const [apply, setApply] = useState<Partial<TermsList>>({
    userId: user.uid,
    cardId: id,
  });

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...apply,
        appliedAt: new Date(),
        status: APPLY_STATUS.REDAY,
      } as TermsList);
    }
  }, [apply, step, onSubmit]);

  const handleTermsChange = (terms: TermsList['terms']) => {
    setApply((prev) => ({ ...prev, terms }));

    setStep((prev) => prev + 1);
  };

  const handleBasicInfoChange = (
    info: Pick<TermsList, 'salary' | 'creditScore' | 'payDate'>
  ) => {
    setApply((prev) => ({ ...prev, ...info }));

    setStep((prev) => prev + 1);
  };

  const handleCardInfoChange = (
    cardInfo: Pick<TermsList, 'isMaster' | 'isPostpay' | 'isHipass'>
  ) => {
    setApply((prev) => ({ ...prev, ...cardInfo }));
    setStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Terms onNext={handleTermsChange} />;
      case 1:
        return <BasicInfo onNext={handleBasicInfoChange} />;
      case 2:
        return <CardInfo onNext={handleCardInfoChange} />;
      default:
        return null;
    }
  };
  return <div>{renderStep()}</div>;
};

export default ApplyIndex;
