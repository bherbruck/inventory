import { Item, InventoryItem } from './types'
import { dateDiff } from './util/date'
import { constrain } from './util/constrain'

export const DEFAULT_ITEM: Omit<Item, 'name'> = {
  minQuality: 0,
  maxQuality: 25,
  minSellIn: -4,
  qualityDelta: -1,
}

export const createItem = (item: Pick<Item, 'name'> & Partial<Item>): Item => ({
  ...DEFAULT_ITEM,
  ...item,
})

export const isActiveInventoryItem = (
  date: Date,
  { receivedDate, sellByDate, item: { minSellIn } }: InventoryItem
) => dateDiff(date, sellByDate) >= minSellIn && date >= receivedDate

export const getInventoryItemQuality = (
  date: Date,
  inventoryItem: InventoryItem
): InventoryItem => {
  const {
    receivedDate,
    sellByDate,
    receivedQuality,
    item: { qualityDelta, minQuality, maxQuality },
  } = inventoryItem
  const isPastSellByDate = sellByDate < date

  const normalQualityDays = dateDiff(
    receivedDate,
    isPastSellByDate ? sellByDate : date
  )
  const doubleQualityDays = isPastSellByDate
    ? dateDiff(sellByDate, date) * 2 // I don't like the magic `2` here
    : 0

  const qualityDays = normalQualityDays + doubleQualityDays

  const constrainedQuality = constrain(
    receivedQuality + qualityDelta * qualityDays,
    minQuality,
    maxQuality
  )
  return { ...inventoryItem, quality: constrainedQuality }
}

export const getInventoryQuality = (
  date: Date,
  inventoryItems: InventoryItem[]
): InventoryItem[] =>
  inventoryItems
    .filter((inventoryItem) => isActiveInventoryItem(date, inventoryItem))
    .map((inventoryItem) => getInventoryItemQuality(date, inventoryItem))
