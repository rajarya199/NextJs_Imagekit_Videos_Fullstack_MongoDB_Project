import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}
const Button = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'font-medium rounded-md focus:outline-none transition-colors'
  const variantStyles = {
    default: 'bg-purple-600 text-white hover:bg-purple-700',
    outline:
      'bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-50',
  }
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  )
}
export default Button
