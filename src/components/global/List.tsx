import { css } from '@emotion/react';
import Flex from '@/components/global/Flex';
import Text from '@/components/global/Text';
import Skeleton from '@/components/global/Skeleton';
import Spacing from '@/components/global/Spacing';
import { IconArrowRight } from '@/components/icons';
interface ListRowProps {
  left?: React.ReactNode;
  contents: React.ReactNode;
  right?: React.ReactNode;
  withArrow?: boolean;
  onClick?: () => void;
  as?: 'div' | 'li';
}

const List = ({
  as = 'li',
  left,
  contents,
  right,
  withArrow,
  onClick,
}: ListRowProps) => {
  return (
    <Flex
      as={as}
      css={listRowContainerStyles}
      onClick={onClick}
      align='center'
      style={{ cursor: 'pointer' }}
    >
      <Flex css={listRowLeftStyles}>{left}</Flex>
      <Flex css={listRowContentsStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow ? <IconArrowRight style={{ width: 20, height: 20 }} /> : null}
    </Flex>
  );
};

const listRowContainerStyles = css`
  padding: 8px 24px;
`;

const listRowLeftStyles = css`
  margin-right: 14px;
`;

const listRowContentsStyles = css`
  flex: 1;
`;

function ListRowTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode;
  subTitle: React.ReactNode;
}) {
  return (
    <Flex direction='column'>
      <Text bold={true}>{title}</Text>
      <Text typography='t7'>{subTitle}</Text>
    </Flex>
  );
}

function ListRowSkeleton() {
  return (
    <Flex as='li' css={listRowContainerStyles} align='center'>
      <Flex css={listRowLeftStyles}></Flex>
      <Flex css={listRowContentsStyles}>
        <List.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={2} />
            </>
          }
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <IconArrowRight style={{ width: 20, height: 20 }} />
    </Flex>
  );
}

List.Texts = ListRowTexts;
List.Skeleton = ListRowSkeleton;

export default List;
