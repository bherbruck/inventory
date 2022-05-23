import { describe, it } from 'mocha'
import { expect } from 'chai'
import { constrain } from './constrain'

describe('constrain', () => {
  it('should constrain a number', () => {
    const value = constrain(10, 5, 20)
    expect(value).to.equal(10)
  })

  it('should constrain a number to a min', () => {
    const value = constrain(10, 15, 20)
    expect(value).to.equal(15)
  })

  it('should constrain a number to a max', () => {
    const value = constrain(10, 0, 5)
    expect(value).to.equal(5)
  })
})
