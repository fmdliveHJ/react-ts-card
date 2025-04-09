import { css } from '@emotion/react';
import { useState, useCallback, useMemo } from 'react';
import { FormValues } from '@/model/signup';
import validator from 'validator';
import Flex from '@/components/global/Flex';
import TextLabel from '@/components/global/TextLabel';
import FixedBottomButton from '@/components/global/FixedBottomButton';
import Spacing from '@/components/global/Spacing';

const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });

  const [isFocused, setIsFocused] = useState<Partial<FormValues>>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setIsFocused((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);

  const disabledAction = Object.keys(errors).length === 0;

  return (
    <Flex direction='column' css={FormStyle}>
      <TextLabel
        label='이메일'
        name='email'
        placeholder='이메일을 입력해주세요.'
        value={formValues.email}
        onChange={handleChange}
        hasError={!!isFocused.email && !!errors.email}
        errorMessage={isFocused.email ? errors.email : ''}
        onFocus={handleFocus}
      />
      <Spacing size={10} />
      <TextLabel
        label='비밀번호'
        type='password'
        name='password'
        value={formValues.password}
        onChange={handleChange}
        hasError={!!isFocused.password && !!errors.password}
        errorMessage={isFocused.password ? errors.password : undefined}
        onFocus={handleFocus}
      />
      <Spacing size={10} />
      <TextLabel
        label='비밀번호 확인'
        type='password'
        name='passwordConfirm'
        value={formValues.passwordConfirm}
        onChange={handleChange}
        hasError={!!isFocused.passwordConfirm && !!errors.passwordConfirm}
        errorMessage={isFocused.passwordConfirm ? errors.passwordConfirm : ''}
        onFocus={handleFocus}
      />
      <Spacing size={10} />
      <TextLabel
        label='이름'
        name='name'
        placeholder='이름을 입력해주세요.'
        value={formValues.name}
        onChange={handleChange}
        hasError={!!isFocused.name && !!errors.name}
        errorMessage={isFocused.name ? errors.name : ''}
        onFocus={handleFocus}
      />
      <FixedBottomButton
        label='회원가입'
        disabled={disabledAction === false}
        onClick={() => {
          onSubmit(formValues);
        }}
      />
    </Flex>
  );
};

function validate(formValues: FormValues) {
  const errors: Partial<FormValues> = {};

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요';
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요';
  }

  if (formValues.passwordConfirm.length < 8) {
    errors.passwordConfirm = '비밀번호를 8글자 이상 입력해주세요';
  } else if (
    validator.equals(formValues.passwordConfirm, formValues.password) === false
  ) {
    errors.passwordConfirm = '비밀번호를 확인해주세요';
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요';
  }

  return errors;
}

export default Form;

const FormStyle = css`
  padding: 20px;
`;
