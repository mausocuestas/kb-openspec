import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * Simplified DropdownMenu component for future authentication phase
 * Full implementation will be added when needed in authentication story
 */

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
	return <div className="relative inline-block">{children}</div>;
};

const DropdownMenuTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-[--sl-color-gray-1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--sl-color-accent]',
			className
		)}
		{...props}
	>
		{children}
	</button>
));
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'absolute right-0 z-50 mt-2 w-56 rounded-md border border-[--sl-color-hairline] bg-[--sl-color-bg] p-1 shadow-lg',
			className
		)}
		{...props}
	>
		{children}
	</div>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-[--sl-color-gray-1] focus:bg-[--sl-color-gray-2] data-disabled:pointer-events-none data-disabled:opacity-50',
			className
		)}
		{...props}
	/>
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuSeparator = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('-mx-1 my-1 h-px bg-[--sl-color-hairline]', className)}
		{...props}
	/>
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
};
