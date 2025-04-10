import styled from '@emotion/styled';
import { forwardRef, SelectHTMLAttributes } from 'react';
import { colors } from '@/styles/colorPalette';
import { Option } from '@/model/apply';
import Flex from '@/components/global/Flex';
import Text from '@/components/global/Text';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  placeholder: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref
) {
  return (
    <Flex direction='column'>
      {label && (
        <Text
          typography='t7'
          color='black'
          display='inline-block'
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      )}

      <BaseSelect required={true} {...props} ref={ref} value={value}>
        <option disabled={true} hidden={true}>
          {placeholder}
        </option>
        {options.map(({ label, value }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </BaseSelect>
    </Flex>
  );
});

export default Select;

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.gray};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: #c0c4c7;
  }
`;
