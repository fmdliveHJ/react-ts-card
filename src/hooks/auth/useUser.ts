import { useRecoilValue } from 'recoil';
import { userAtom } from '@/atoms/user';

export const useUser = () => {
  return useRecoilValue(userAtom);
};
