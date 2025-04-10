import Form from '@/components/login/Form';
import { LoginValues } from '@/model/signin';
import { useCallback } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/remote/firebase';
import { useAlertContext } from '@/context/AlertContext';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { open } = useAlertContext();
  const navigate = useNavigate();

  const handleLogin = useCallback(async (formValues: LoginValues) => {
    const { email, password } = formValues;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/wrong-password') {
          open({
            title: '로그인 실패',
            onButtonClick: () => {
              console.log('button clicked');
            },
          });
        }
      }
      open({
        title: '잠시 후 다시 시도해주세요.',
        onButtonClick: () => {
          console.log('button clicked');
        },
      });
    }
  }, []);

  return <Form onSubmit={handleLogin} />;
};

export default Login;
