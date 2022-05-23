import { describe, it } from 'mocha'
import { expect } from 'chai'
import { dateRange } from './date-range'

describe('date-range', () => {
  it('should return a date range', () => {
    const startDate = new Date('2021-01-01')
    const endDate = new Date('2021-01-10')
    const dates = dateRange(startDate, endDate)
    expect(dates).to.have.lengthOf(10)
    expect(dates[0].toISOString()).to.equal('2021-01-01T00:00:00.000Z')
    expect(dates[9].toISOString()).to.equal('2021-01-10T00:00:00.000Z')
  })
})
