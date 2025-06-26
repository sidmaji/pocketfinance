import { clsx } from 'clsx'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
        <button
            className={clsx(
                'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
                {
                    'bg-gradient-primary text-white hover:scale-105 hover:shadow-lg focus:ring-purple-500': variant === 'primary',
                    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md focus:ring-gray-500': variant === 'secondary',
                    'border-2 border-purple-500 text-purple-500 hover:bg-purple-50 focus:ring-purple-500': variant === 'outline',
                    'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500': variant === 'ghost',
                    'px-3 py-2 text-sm': size === 'sm',
                    'px-6 py-3 text-base': size === 'md',
                    'px-8 py-4 text-lg': size === 'lg',
                    'opacity-50 cursor-not-allowed': disabled || isLoading,
                },
                className
            )}
            disabled={disabled || isLoading}
            ref={ref}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    )
})

Button.displayName = 'Button'

export default Button
