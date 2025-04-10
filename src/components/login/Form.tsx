import { useState, useCallback, useMemo } from 'react';
import { css } from '@emotion/react';
import { colors } from '@/styles/colorPalette';
import validator from 'validator';
import { Link } from 'react-router-dom';
import Flex from '@/components/global/Flex';
import TextLabel from '@/components/global/TextLabel';
import Button from '@/components/global/Button';
import Spacing from '@/components/global/Spacing';
import Text from '@/components/global/Text';

import { LoginValues } from '@/model/signin';

const Form = ({
  onSubmit,
}: {
  onSubmit: (formValues: LoginValues) => void;
}) => {
  const [formValues, setFormValues] = useState<LoginValues>({
    email: '',
    password: '',
  });

  const handleLoginValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const errors = useMemo(() => validate(formValues), [formValues]);

  const loginCondition = Object.keys(errors).length === 0;

  return (
    <Flex direction='column' css={FormStyle}>
      <TextLabel
        label='이메일'
        name='email'
        placeholder='이메일을 입력해주세요.'
        value={formValues.email}
        onChange={handleLoginValues}
      />
      <Spacing size={10} />
      <TextLabel
        type='password'
        label='비밀번호'
        name='password'
        placeholder='비밀번호를 입력해주세요.'
        value={formValues.password}
        onChange={handleLoginValues}
      />
      <Spacing size={10} />
      <Button
        size='medium'
        disabled={!loginCondition}
        onClick={() => onSubmit(formValues)}
      >
        로그인
      </Button>
      <Spacing size={15} />
      <Link to='/join' css={LinkStyle}>
        <Text>회원가입으로 이동</Text>
      </Link>
    </Flex>
  );
};

export default Form;

function validate(formValues: LoginValues) {
  const errors: Partial<LoginValues> = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요';
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요';
  }

  return errors;
}

const FormStyle = css`
  padding: 20px;
`;

const LinkStyle = css`
  text-align: center;
  &:hover {
    color: ${colors.blue};
  }
`;
