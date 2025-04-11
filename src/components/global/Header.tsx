import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { useCallback } from 'react';
import { colors } from '@/styles/colorPalette';

import Flex from './Flex';
import Text from './Text';
import Button from './Button';

import { useUser } from '@/hooks/auth/useUser';
import { auth } from '@/remote/firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const location = useLocation();
  const showJoinButton =
    ['/join', '/login'].includes(location.pathname) === false;

  const user = useUser();

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to='/login'>
          <Button onClick={handleLogout}>로그아웃</Button>
        </Link>
      );
    }
    if (showJoinButton) {
      return (
        <Link to='/login'>
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }

    return null;
  }, [user, showJoinButton, handleLogout]);

  return (
    <Flex justify='space-between' align='center' css={HeaderStyle}>
      <Link to='/'>
        <Text>Home</Text>
      </Link>
      {renderButton()}
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
