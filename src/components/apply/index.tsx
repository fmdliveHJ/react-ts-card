import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Terms from '@/components/apply/Terms';
import CardInfo from '@/components/apply/CardInfo';
import BasicInfo from '@/components/apply/BasicInfo';

import { TermsList, APPLY_STATUS } from '@/model/apply';
import { useUser } from '@/hooks/auth/useUser';
import ProgressBar from '@/components/global/ProgressBar';
const ApplyIndex = ({ onSubmit }: { onSubmit: (terms: TermsList) => void }) => {
  const user = useUser();
  const { id } = useParams() as { id: string };
  const storageKey = `apply-${user?.uid}-${id}`;
  const LAST_STEP = 3;
  const [apply, setApply] = useState<Partial<TermsList>>(() => {
    const localData = localStorage.getItem(storageKey);

    if (localData == null) {
      return {
        userId: user.uid,
        cardId: id,
        step: 0,
      };
    }

    return JSON.parse(localData);
  });

  useEffect(() => {
    if (apply.step === 3) {
      localStorage.removeItem(storageKey);

      onSubmit({
        ...apply,
        appliedAt: new Date(),
        status: APPLY_STATUS.REDAY,
      } as TermsList);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(apply));
    }
  }, [apply, onSubmit, storageKey]);

  const handleTermsChange = (terms: TermsList['terms']) => {
    setApply((prev) => ({
      ...prev,
      terms,
      step: (prev.step as number) + 1,
    }));
  };

  const handleBasicInfoChange = (
    info: Pick<TermsList, 'salary' | 'creditScore' | 'payDate'>
  ) => {
    setApply((prev) => ({
      ...prev,
      ...info,
      step: (prev.step as number) + 1,
    }));
  };

  const handleCardInfoChange = (
    cardInfo: Pick<TermsList, 'isMaster' | 'isPostpay' | 'isHipass'>
  ) => {
    setApply((prev) => ({
      ...prev,
      ...cardInfo,
      step: (prev.step as number) + 1,
    }));
  };

  const renderStep = () => {
    switch (apply.step) {
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
  return (
    <div>
      <ProgressBar progress={apply.step / LAST_STEP} />
      {renderStep()}
    </div>
  );
};

export default ApplyIndex;
