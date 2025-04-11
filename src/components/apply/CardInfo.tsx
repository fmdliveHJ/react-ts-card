import Button from '@/components/global/Button';
import { css } from '@emotion/react';
import Spacing from '@/components/global/Spacing';
import { useState, useCallback } from 'react';
import FixedBottomButton from '@/components/global/FixedBottomButton';
import { TermsList } from '@/model/apply';
type CardInfoProps = Pick<TermsList, 'isMaster' | 'isPostpay' | 'isHipass'>;

const CardInfo = ({
  onNext,
}: {
  onNext: (cardInfo: CardInfoProps) => void;
}) => {
  const [cardInfo, setCardInfo] = useState<CardInfoProps>({
    isMaster: false,
    isPostpay: false,
    isHipass: false,
  });

  const { isMaster, isPostpay, isHipass } = cardInfo;

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const $button = e.target as HTMLButtonElement;
      setCardInfo((prev) => ({
        ...prev,
        [$button.name]: JSON.parse($button.dataset.value as string),
      }));
    },
    []
  );

  const cardInfoNext = Object.values(cardInfo).every((value) => value === true);
  return (
    <div css={CardInfoStyle}>
      <Button.Group title='해외 결제'>
        <Button
          name='isMaster'
          weak={isMaster === false}
          size='medium'
          data-value={true}
          onClick={handleButtonClick}
        >
          MasterCard
        </Button>
        <Button
          name='isMaster'
          weak={isMaster === true}
          size='medium'
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>
      <Spacing size={20} />

      <Button.Group title='후불교통기능'>
        <Button
          name='isPostpay'
          weak={isPostpay === true}
          size='medium'
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name='isPostpay'
          weak={isPostpay === false}
          size='medium'
          data-value={true}
          onClick={handleButtonClick}
        >
          신청함
        </Button>
      </Button.Group>

      <Button.Group title='후불하이패스'>
        <Button
          name='isHipass'
          weak={isHipass === true}
          size='medium'
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name='isHipass'
          weak={isHipass === false}
          size='medium'
          data-value={true}
          onClick={handleButtonClick}
        >
          신청함
        </Button>
      </Button.Group>

      <FixedBottomButton
        label='다음'
        onClick={() => {
          onNext(cardInfo);
        }}
        disabled={!cardInfoNext}
      />
    </div>
  );
};

export default CardInfo;

const CardInfoStyle = css`
  padding: 20px;
`;
