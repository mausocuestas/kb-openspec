import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-[--sl-color-accent] text-white hover:bg-[--sl-color-accent-high]',
				secondary:
					'border-transparent bg-[--sl-color-gray-2] text-[--sl-color-text] hover:bg-[--sl-color-gray-3]',
				destructive:
					'border-transparent bg-red-600 text-white hover:bg-red-700',
				outline: 'text-[--sl-color-text] border-[--sl-color-hairline]',
				health:
					'border-transparent bg-[var(--health-green-light)] text-[var(--health-green)] hover:bg-[var(--health-green-light)]',
				info:
					'border-transparent bg-[var(--health-teal-light)] text-[var(--health-teal)] hover:bg-[var(--health-teal-light)]',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
