import React from 'react'
import { StyledButton } from './Button.styles'

// const b: any = {}

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
function Button({ children, ...props }: ButtonProps) {
  return (
    <StyledButton type="button" {...props}>
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  text: 'FUCK THIS BUTTON',
}

export default Button
