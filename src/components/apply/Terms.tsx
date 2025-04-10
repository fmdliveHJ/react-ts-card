import Agreement from '../global/Agreement';
import { useState, useCallback } from 'react';
import Text from '../global/Text';
import { TERMS_LIST } from '@/constants/apply';
import { TermsList } from '@/model/apply';
import FixedBottomButton from '../global/FixedBottomButton';

const Terms = ({ onNext }: { onNext: (terms: TermsList['terms']) => void }) => {
  const [checkedTerms, setCheckedTerms] = useState(
    TERMS_LIST.reduce<Record<string, boolean>>((acc, list) => {
      return {
        ...acc,
        [list.id]: false,
      };
    }, {})
  );

  const allChecked = Object.values(checkedTerms).every((checked) => checked);

  const allChangeHandler = useCallback(
    (_: React.MouseEvent<HTMLElement>, checked: boolean) => {
      setCheckedTerms((prev) => {
        return Object.keys(prev).reduce((acc, list) => {
          return {
            ...acc,
            [list]: checked,
          };
        }, {});
      });
    },
    []
  );

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={allChecked} onChange={allChangeHandler}>
          이용약관 동의
        </Agreement.Title>
        {TERMS_LIST.map((list) => {
          return (
            <Agreement.Content
              key={list.id}
              checked={checkedTerms[list.id]}
              onChange={(e, checked) => {
                setCheckedTerms({
                  ...checkedTerms,
                  [list.id]: checked,
                });
              }}
            >
              <Text>{list.title}</Text>
            </Agreement.Content>
          );
        })}
      </Agreement>
      <FixedBottomButton
        label='약관동의'
        disabled={!allChecked}
        onClick={() => {
          onNext(Object.keys(checkedTerms).filter((key) => checkedTerms[key]));
        }}
      />
    </div>
  );
};

export default Terms;
