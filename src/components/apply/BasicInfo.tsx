import { useState, useCallback } from 'react';

import Select from '@/components/global/Select';
import Flex from '@/components/global/Flex';

import {
  yearOptions,
  creditScoreOptions,
  paymentDateOptions,
} from '@/constants/apply';

import { TermsList } from '@/model/apply';
import FixedBottomButton from '../global/FixedBottomButton';

type InfoValues = Pick<TermsList, 'salary' | 'creditScore' | 'payDate'>;

const BasicInfo = ({ onNext }: { onNext: (info: InfoValues) => void }) => {
  const [info, setInfo] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  });

  const handleInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setInfo({
        ...info,
        [name]: value,
      });
    },
    [info]
  );

  const handleNext = Object.values(info).every((value) => value !== '');

  return (
    <Flex direction='column'>
      <Select
        name='salary'
        label='연소득'
        options={yearOptions}
        placeholder={yearOptions[0].label}
        value={info.salary}
        onChange={handleInfoChange}
      />
      <Select
        name='creditScore'
        label='신용점수'
        options={creditScoreOptions}
        placeholder={creditScoreOptions[0].label}
        value={info.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name='payDate'
        label='결제일'
        options={paymentDateOptions}
        placeholder={paymentDateOptions[0].label}
        value={info.payDate}
        onChange={handleInfoChange}
      />

      <FixedBottomButton
        label='다음'
        onClick={() => {
          onNext(info);
        }}
        disabled={!handleNext}
      />
    </Flex>
  );
};

export default BasicInfo;
