import React from 'react'
import { StyledButton } from './Button.styles'

const b: any = {}

export interface ButtonProps {
  /**
   * This is custom description
   */
  children?: React.ReactNode
  onClick?: any
  text?: string
}

/**
 * Button component
 * @param children
 * @param props
 * @constructor
 */
export function Button({ children, ...props }: ButtonProps) {
  const exampleOptionalChaining = b?.d?.g?.g?.()
  return (
    <StyledButton type="button" disabled {...props}>
      {children} {exampleOptionalChaining}jsx-props-no-spreading
    </StyledButton>
  )
}
