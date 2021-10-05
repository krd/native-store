class Order {
  constructor(
    id,
    ownerId,
    items,
    totalAmount,
    date
  ) {
    this.id = id
    this.ownerId = ownerId,
    this.items = items
    this.totalAmount = totalAmount
    this.date = date
  }
}
export default Order