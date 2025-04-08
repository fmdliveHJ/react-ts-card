import { css } from '@emotion/react';
import Text from './components/global/Text';
import Button from './components/global/Button';
import Input from './components/global/Input';
import TextField from './components/global/TextLabel';

import { useAlertContext } from './context/AlertContext';
function App() {
  const { open } = useAlertContext();

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-height: 100vh;
      `}
    >
      <Text typography='t1'>t1</Text>
      <Text typography='t2'>t2</Text>
      <Text typography='t3'>t3</Text>
      <Text typography='t4'>t4</Text>
      <Text typography='t5'>t5</Text>

      <Button color='primary' size='small' weak full>
        버튼
      </Button>
      <Button color='success' size='medium' weak full>
        버튼
      </Button>
      <Button color='error' size='large' full>
        버튼
      </Button>

      <Input aria-invalid={false} />
      <TextField label='아이디' />
      <TextField label='비밀번호' />

      <Button
        color='primary'
        onClick={() =>
          open({
            title: '알림',
            description: '알림 내용',
            buttonLabel: '확인',
            onButtonClick: () => {},
          })
        }
      >
        알림
      </Button>
    </div>
  );
}

export default App;
