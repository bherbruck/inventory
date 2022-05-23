import { type InventoryItem, createItem, getInventoryQuality } from '../src'
import { dateRange } from '../src/util/date'

// these would be in a database (not an array or object here so they can used easily later)
const apple = createItem({ name: 'Apple' })
const banana = createItem({ name: 'Banana' })
const strawberry = createItem({ name: 'Strawberry' })
const cheddarCheese = createItem({ name: 'Cheddar Cheese', qualityDelta: 1 })
const instantRamen = createItem({
  name: 'Instant Ramen',
  minSellIn: -Infinity, // awkward in a database, but it's just for this example
  qualityDelta: 0,
})
const organicAvocado = createItem({ name: 'Organic Avocado', qualityDelta: -2 })

// these would be in a database
const storeInventory: InventoryItem[] = [
  {
    item: apple,
    receivedDate: new Date('2022-01-01'),
    sellByDate: new Date('2022-01-10'),
    receivedQuality: 25,
  },
  {
    item: banana,
    receivedDate: new Date('2022-01-01'),
    sellByDate: new Date('2022-01-09'),
    receivedQuality: 25,
  },
  {
    item: strawberry,
    receivedDate: new Date('2022-01-01'),
    sellByDate: new Date('2022-01-08'),
    receivedQuality: 15,
  },
  {
    item: cheddarCheese,
    receivedDate: new Date('2022-01-01'),
    sellByDate: new Date('2022-01-25'),
    receivedQuality: 2,
  },
  {
    item: instantRamen,
    receivedDate: new Date('2022-01-01'),
    sellByDate: new Date('2022-01-30'),
    receivedQuality: 25,
  },
  {
    item: organicAvocado,
    receivedDate: new Date('2022-01-01'),
    sellByDate: new Date('2022-01-20'),
    receivedQuality: 25,
  },
]

export const runScenario = (dates: Date[], inventoryItems: InventoryItem[]) =>
  dates.reduce(
    (acc, date) => ({
      ...acc,
      [date.toISOString().split('T')[0]]: getInventoryQuality(
        date,
        inventoryItems
      ),
    }),
    {} as { [key: string]: InventoryItem[] }
  )

const scenarioResult = runScenario(
  dateRange(new Date('2021-12-25'), new Date('2022-01-30')),
  storeInventory
)

console.log({ scenarioResult })

console.log()
