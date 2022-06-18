import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { forwardRef, HTMLInputTypeAttribute } from 'react';
import { FieldError } from 'react-hook-form';

export interface FormInputProps extends InputProps {
  name: HTMLInputTypeAttribute;
  error?: FieldError;
  id?: string;
  label?: string;
}

// eslint-disable-next-line react/display-name
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const { error, label, name, id = name, ...rest } = props;

    return (
      <FormControl isInvalid={Boolean(error)}>
        {label && <FormLabel htmlFor={id}>{label}</FormLabel>}

        <Input
          ref={ref}
          id={id}
          name={name}
          size="lg"
          variant="filled"
          bg="gray.900"
          focusBorderColor="pink.500"
          _hover={{ bg: 'gray.900' }}
          {...rest}
        />

        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  },
);
