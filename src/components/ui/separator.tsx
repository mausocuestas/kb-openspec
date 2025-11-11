import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: 'horizontal' | 'vertical';
	decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
	(
		{ className, orientation = 'horizontal', decorative = true, ...props },
		ref
	) => (
		<div
			ref={ref}
			role={decorative ? 'none' : 'separator'}
			aria-orientation={orientation}
			className={cn(
				'shrink-0',
				orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
				className
			)}
			style={{
				backgroundColor: 'var(--sl-color-gray-3)',
				marginTop: orientation === 'horizontal' ? '1rem' : undefined,
				marginBottom: orientation === 'horizontal' ? '1rem' : undefined,
			}}
			{...props}
		/>
	)
);
Separator.displayName = 'Separator';

export { Separator };
