import styled from '@emotion/styled';
import { colors } from '@/styles/colorPalette';

import Text from './Text';
import Dimm from './Dimm';
import Flex from './Flex';
import Button from './Button';

interface AlertProps {
  open?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  buttonLabel?: string;
  onButtonClick: () => void;
}

function Alert({
  open = false,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
}: AlertProps) {
  if (!open) return null;

  return (
    <Dimm>
      <AlertContainer>
        <Text
          typography='t4'
          bold={true}
          display='block'
          style={{ marginBottom: 6 }}
        >
          {title}
        </Text>
        {description ? <Text typography='t7'>{description}</Text> : null}
        <Flex justify='flex-end'>
          <Button
            onClick={onButtonClick}
            color='primary'
            weak={true}
            style={{ marginTop: 12, border: 'none' }}
          >
            {buttonLabel}
          </Button>
        </Flex>
      </AlertContainer>
    </Dimm>
  );
}

const AlertContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: var(--alert-zindex);
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
`;

export default Alert;
