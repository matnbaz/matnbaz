import { InputHTMLAttributes } from 'react';
import CheckboxInput from './CheckboxInput';
import RadioInput from './RadioInput';
import TextareaInput from './TextareaInput';
import TextInput, { ITextInputProps } from './TextInput';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// Default input is set to text input
const Input = ({ ...props }: ITextInputProps) => {
  return <TextInput {...props} />;
};

Input.Text = TextInput as any;
Input.Checkbox = CheckboxInput;
Input.Radio = RadioInput;
Input.Textarea = TextareaInput;

export default Input;
