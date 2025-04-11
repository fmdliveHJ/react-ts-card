import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  ButtonColor,
  ButtonSize,
  buttonColorMap,
  buttonWeakMap,
  buttonSizeMap,
} from '@/styles/button';

import Flex from '@/components/global/Flex';
import Text from '@/components/global/Text';
import Spacing from './Spacing';

interface ButtonProps {
  color?: ButtonColor;
  size?: ButtonSize;
  weak?: boolean;
  full?: boolean;
  disabled?: boolean;
}

const DefaultButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '8px',
  },
  ({ color = 'primary', weak }) =>
    weak ? buttonWeakMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.5;
          cursor: initial;
        `
      : undefined
);

function ButtonGroup({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Flex direction='column'>
      {title && (
        <>
          <Text typography='t6'>{title}</Text>
          <Spacing size={10} />
        </>
      )}

      <Flex css={buttonGroupStyle}>{children}</Flex>
    </Flex>
  );
}

const buttonGroupStyle = css`
  flex-wrap: wrap;
  gap: 10px;
  & button {
    flex: 1;
  }
`;

const Button = DefaultButton as typeof DefaultButton & {
  Group: typeof ButtonGroup;
};

Button.Group = ButtonGroup;

export default Button;
