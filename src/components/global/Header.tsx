import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { useCallback } from 'react';
import { colors } from '@/styles/colorPalette';
import { useUser } from '@/hooks/auth/useUser';
import MyPageImage from '@/components/mypage/MyPageImage';
import Flex from './Flex';
import Button from './Button';
import { IconHome } from '@/components/icons';

const Header = () => {
  const location = useLocation();
  const showJoinButton =
    ['/join', '/login'].includes(location.pathname) === false;

  const user = useUser();

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Link to='/login'>
          <MyPageImage size={30} />
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
  }, [user, showJoinButton]);

  return (
    <Flex justify='space-between' align='center' css={HeaderStyle}>
      <Link to='/'>
        <IconHome
          style={{
            width: 24,
            height: 24,
            stroke: colors.black,
            fill: colors.black,
          }}
        />
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
