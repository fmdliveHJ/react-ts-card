import Flex from '@/components/global/Flex';
import Text from '@/components/global/Text';
import Button from '@/components/global/Button';
import { useUser } from '@/hooks/auth/useUser';
import { auth } from '@/remote/firebase';
import { signOut } from 'firebase/auth';
import { useCallback } from 'react';
import MyPageImage from '@/components/mypage/MyPageImage';
import Spacing from '@/components/global/Spacing';

const MyPage = () => {
  const user = useUser();
  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  return (
    <Flex direction='column' align='center'>
      <Spacing size={20} />
      <MyPageImage size={100} mode='upload' />
      <Spacing size={20} />
      <Text>{user?.displayName}</Text>
      <Spacing size={20} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  );
};

export default MyPage;
