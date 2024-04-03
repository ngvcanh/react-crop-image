import { FC, HTMLProps, PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  variant: string;
  className?: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ variant, className, children, ...rest }) => {
  return (
    <button
      {...rest}
      type="button"
      className={clsx(className, 'hover:shadow-inner px-4 py-2 text-sm rounded-3xl', {
        'bg-blue-500 text-white hover:bg-blue-700 hover:text-white': variant === 'primary',
        'bg-red-500 text-white hover:bg-red-700 hover:text-white': variant === 'secondary',
        'bg-white text-gray-900 hover:bg-white hover:text-blue-500': variant === 'light'
      })}
    >
      {children}
    </button>
  );
};

export default Button;
