/**
 * Represents a base item in the database
 */
export type Item = {
  name: string
  minQuality: number
  maxQuality: number
  minSellIn: number
  qualityDelta: number
}

/**
 * Represents a single inventory item (lot) in the database
 */
export type InventoryItem = {
  item: Item
  receivedDate: Date
  sellByDate: Date
  receivedQuality: number
  receivedQuantity?: boolean
  quality?: number // this should probably be on another type, maybe an inventory status type
}

/**
 * TODO: this, but a spec is needed to implement
 */
export type PromotionItem = {}
