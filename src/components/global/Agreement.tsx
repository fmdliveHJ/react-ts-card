import { css } from '@emotion/react';
import Flex from './Flex';
import Text from './Text';
import { IconAgreementCheck } from '@/components/icons';

const Agreement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex as='ul' direction='column' css={AgreeContainer}>
      {children}
    </Flex>
  );
};

const AgreementTitle = ({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: React.MouseEvent<HTMLElement>, checked: boolean) => void;
}) => {
  return (
    <Flex onClick={(e) => onChange(e, !checked)}>
      <IconAgreementCheck withCircle={true} checked={checked} />
      <Text bold={true}>{children}</Text>
    </Flex>
  );
};

const AgreementContent = ({
  children,
  checked,
  onChange,
  link,
}: {
  children: React.ReactNode;
  checked: boolean;
  onChange: (e: React.MouseEvent<HTMLElement>, checked: boolean) => void;
  link?: string;
}) => {
  return (
    <Flex as='li'>
      <Flex onClick={(e) => onChange(e, !checked)}>
        <IconAgreementCheck withCircle={false} checked={checked} />
        <Text>{children}</Text>
      </Flex>
      {link && (
        <a href={link} target='_blank' rel='noreferrer'>
          <Text typography='t6'>상세보기</Text>
        </a>
      )}
    </Flex>
  );
};

Agreement.Title = AgreementTitle;
Agreement.Content = AgreementContent;

export default Agreement;

const AgreeContainer = css`
  padding: 24px;
  & li {
    cursor: pointer;
  }
`;
