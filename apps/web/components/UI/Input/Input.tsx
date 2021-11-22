import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';
import { HiStar } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import CheckboxInput from './CheckboxInput';
import TextInput, { ITextInputProps } from './TextInput';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// Default input is set to text input
const Input = ({ ...props }: ITextInputProps) => {
  return <TextInput {...props} />;
};

Input.Text = TextInput;
Input.Checkbox = CheckboxInput;

export default Input;
