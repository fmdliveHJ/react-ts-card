import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { auth } from '@/remote/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { userAtom } from '@/atoms/user';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      });
    } else {
      setUser(null);
    }

    setIsInitialized(true);
  });

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
