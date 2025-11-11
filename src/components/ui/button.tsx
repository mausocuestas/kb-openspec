import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'bg-[--sl-color-accent] text-white hover:bg-[--sl-color-accent-high] focus-visible:ring-[--sl-color-accent]',
				destructive:
					'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
				outline:
					'border-2 border-[--sl-color-accent] bg-transparent text-[--sl-color-accent] hover:bg-[--sl-color-accent-low] focus-visible:ring-[--sl-color-accent]',
				secondary:
					'bg-[--sl-color-gray-2] text-[--sl-color-text] hover:bg-[--sl-color-gray-3] focus-visible:ring-[--sl-color-gray-5]',
				ghost: 'hover:bg-[--sl-color-gray-1] text-[--sl-color-text] focus-visible:ring-[--sl-color-gray-5]',
				link: 'text-[--sl-color-accent] underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
