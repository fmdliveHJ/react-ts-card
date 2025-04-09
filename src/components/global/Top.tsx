import { css } from '@emotion/react';

import Flex from '@/components/global/Flex';
import Text from '@/components/global/Text';

interface TopProps {
  title: string;
  description: string;
}

const Top = ({ title, description }: TopProps) => {
  return (
    <Flex direction='column' css={containerStyles}>
      <Text bold={true} typography='t4'>
        {title}
      </Text>
      <Text typography='t5'>{description}</Text>
    </Flex>
  );
};

export default Top;

const containerStyles = css`
  padding: 24px;
`;
