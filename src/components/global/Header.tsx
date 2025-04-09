import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';

import { colors } from '@/styles/colorPalette';

import Flex from './Flex';
import Text from './Text';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const showJoinButton =
    ['/join', '/login'].includes(location.pathname) === false;

  return (
    <Flex justify='space-between' align='center' css={HeaderStyle}>
      <Link to='/'>
        <Text>Header</Text>
      </Link>
      {showJoinButton && (
        <Link to='/join'>
          <Button>로그인/회원가입</Button>
        </Link>
      )}
    </Flex>
  );
};

export default Header;

const HeaderStyle = css`
  width: 100%;
  height: 50px;
  background-color: ${colors.white};
  padding: 10px 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid ${colors.gray};
`;
