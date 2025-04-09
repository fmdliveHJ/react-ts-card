import {
  FocusEventHandler,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from 'react';
import Text from '@/components/global/Text';
import Input from '@/components/global/Input';

interface TextLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMessage?: React.ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextLabelProps>(
  function TextField(
    { label, hasError, helpMessage, onFocus, onBlur, ...props },
    ref
  ) {
    const [isFocused, setIsFocused] = useState(false);
    const labelColor = hasError ? 'red' : isFocused ? 'blue' : undefined;

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div>
        {label ? (
          <Text
            typography='t7'
            color={labelColor}
            display='inline-block'
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : null}
        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {helpMessage ? (
          <Text
            typography='t7'
            color='grey'
            display='inline-block'
            style={{ marginTop: 4, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    );
  }
);

export default TextField;
