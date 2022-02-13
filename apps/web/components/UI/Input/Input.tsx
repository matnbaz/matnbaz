import { InputHTMLAttributes } from 'react';
import { CheckboxInput } from './CheckboxInput';
import { RadioInput } from './RadioInput';
import { TextareaInput } from './TextareaInput';
import { TextInput, TextInputProps } from './TextInput';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// Default input is set to text input
export const Input = ({ ...props }: TextInputProps) => {
  return <TextInput {...props} />;
};

Input.Text = TextInput as any;
Input.Checkbox = CheckboxInput;
Input.Radio = RadioInput;
Input.Textarea = TextareaInput;
