import { cn } from '@/lib/utils';
import * as React from 'react';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={props.name}
            className="text-text-secondary mb-2 text-xs"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full border border-[#676C73] px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />
        {!!error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
