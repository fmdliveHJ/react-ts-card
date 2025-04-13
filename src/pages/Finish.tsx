import { parse } from 'qs';

import Flex from '@/components/global/Flex';
import Text from '@/components/global/Text';
import FixedBottomButton from '@/components/global/FixedBottomButton';
import { useNavigate } from 'react-router-dom';
const Finish = () => {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string };

  const navigate = useNavigate();

  return (
    <Flex>
      <Text>
        {success === 'true'
          ? '카드가 발급되었습니다.'
          : '카드 발급에 실패했습니다.'}
      </Text>

      <FixedBottomButton
        label='확인'
        onClick={() => {
          navigate('/');
        }}
      />
    </Flex>
  );
};

export default Finish;
