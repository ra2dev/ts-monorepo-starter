import React from 'react'
import renderer from 'react-test-renderer'
import Button from './index'

describe('Button', () => {
  it('match snapshot', () => {
    const tree = renderer.create(<Button />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
