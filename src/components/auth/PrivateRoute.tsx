import { useUser } from '@/hooks/auth/useUser';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();

  if (user == null) {
    return <Navigate to='/login' replace={true} />;
  }
  return <div>{children}</div>;
};

export default PrivateRoute;
