import React from 'react'
import { StyledButton } from './Button.styles'

export interface ButtonProps {
  /**
   * This is custom description
   */
  children?: React.ReactNode
  onClick?(event: any): void
  text?: React.ReactNode
}

/**
 * Button component
 */
export const Button: React.FC<ButtonProps> =  ({ children, ...props }) => {
  return (
    <StyledButton type="button" {...props}>
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  text: 'Default text',
}

export default Button
