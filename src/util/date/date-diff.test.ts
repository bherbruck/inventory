import { describe, it } from 'mocha'
import { expect } from 'chai'
import { dateDiff } from './date-diff'

describe('date-diff', () => {
  it('should return the number of days between two dates', () => {
    const startDate = new Date('2021-01-01')
    const endDate = new Date('2021-01-10')
    const days = dateDiff(startDate, endDate)
    expect(days).to.equal(9)
  })

  it('should return the number of days between two dates, including the last date', () => {
    const startDate = new Date('2021-01-01')
    const endDate = new Date('2021-01-10')
    const days = dateDiff(startDate, endDate, { includeLastDate: true })
    expect(days).to.equal(10)
  })

  it('should return the number of months between two dates (different interval)', () => {
    const startDate = new Date('2021-01-01')
    const endDate = new Date('2021-02-01')
    const months = dateDiff(startDate, endDate, {
      interval: 'month',
    })
    expect(months).to.equal(1)
  })
})
