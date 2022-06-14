import {
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { HTMLInputTypeAttribute } from 'react';

export interface FormInputProps extends InputProps {
  name: HTMLInputTypeAttribute;
  id?: string;
  label?: string;
  FormControlProps?: FormControlProps;
  FormLabelProps?: FormLabelProps;
}

export function FormInput({
  label,
  name,
  id = name,
  FormControlProps: formControlProps = {},
  FormLabelProps: formLabelProps = {},
  ...props
}: FormInputProps) {
  return (
    <FormControl {...formControlProps}>
      {label && (
        <FormLabel htmlFor={id} {...formLabelProps}>
          {label}
        </FormLabel>
      )}

      <Input
        id={id}
        name={name}
        size="lg"
        variant="filled"
        bg="gray.900"
        focusBorderColor="pink.500"
        _hover={{ bg: 'gray.900' }}
        {...props}
      />
    </FormControl>
  );
}
