import { describe, it } from 'mocha'
import { expect } from 'chai'
import {
  createItem,
  isActiveInventoryItem,
  getInventoryItemQuality,
  getInventoryQuality,
  DEFAULT_ITEM,
} from './inventory'
import type { InventoryItem } from './types'

describe('inventory', () => {
  const defaultTestItem = createItem({ name: 'Test Item' })
  const organicTestItem = createItem({
    name: 'Organic Test Item',
    qualityDelta: -2,
  })
  const defaultTestInventoryItem: InventoryItem = {
    receivedDate: new Date('2020-01-01'),
    sellByDate: new Date('2020-01-10'),
    receivedQuality: 25,
    item: defaultTestItem,
  }
  const organicTestInventoryItem: InventoryItem = {
    receivedDate: new Date('2020-01-01'),
    sellByDate: new Date('2020-01-10'),
    receivedQuality: 25,
    item: organicTestItem,
  }

  it('should create a default inventory item', () => {
    expect(defaultTestItem).to.deep.equal({
      ...DEFAULT_ITEM,
      name: 'Test Item',
    })
  })

  it('should create an custom inventory item', () => {
    expect(organicTestItem).to.deep.equal({
      ...DEFAULT_ITEM,
      name: 'Organic Test Item',
      qualityDelta: -2,
    })
  })

  it('should return true if the inventory item is active', () => {
    expect(
      isActiveInventoryItem(new Date('2020-01-10'), defaultTestInventoryItem)
    ).to.equal(true)
  })

  it('should return false if the inventory item is not active', () => {
    expect(
      isActiveInventoryItem(new Date('2020-01-16'), defaultTestInventoryItem)
    ).to.equal(false)
  })

  it('should return the inventory item with the updated quality', () => {
    const { quality } = getInventoryItemQuality(
      new Date('2020-01-02'),
      defaultTestInventoryItem
    )
    expect(quality).to.equal(24)
  })

  it('should return the inventory item with the updated quality (greater negative delta)', () => {
    const { quality } = getInventoryItemQuality(
      new Date('2020-01-02'),
      organicTestInventoryItem
    )
    expect(quality).to.equal(23)
  })

  it('should return the inventory items with the updated qualities (past sellByDate)', () => {
    const { quality } = getInventoryItemQuality(
      new Date('2020-01-11'),
      defaultTestInventoryItem
    )
    expect(quality).to.equal(14)
  })

  it('should return the inventory items with the updated qualities (past sellByDate, greater negative delta)', () => {
    const { quality } = getInventoryItemQuality(
      new Date('2020-01-11'),
      organicTestInventoryItem
    )
    expect(quality).to.equal(3)
  })

  it('should return the inventory of multiple items', () => {
    const newInventory = getInventoryQuality(new Date('2020-01-02'), [
      defaultTestInventoryItem,
      organicTestInventoryItem,
    ])
    expect(newInventory[0].quality).to.equal(24)
    expect(newInventory[1].quality).to.equal(23)
  })

  it('should return the inventory of multiple items (past sellByDate)', () => {
    const newInventory = getInventoryQuality(new Date('2020-01-11'), [
      defaultTestInventoryItem,
      organicTestInventoryItem,
    ])
    expect(newInventory[0].quality).to.equal(14)
    expect(newInventory[1].quality).to.equal(3)
  })

  it('should return no items because they are past sellByDate and minSellIn', () => {
    const newInventory = getInventoryQuality(new Date('2020-01-06'), [
      {
        ...defaultTestInventoryItem,
        sellByDate: new Date('2020-01-01'), // modify sellByDate
      },
      organicTestInventoryItem,
    ])
    expect(newInventory.length).to.equal(1)
  })
})
