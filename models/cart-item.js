class CartItem {
  constructor (
    quantity,
    price,
    title,
    sum,
    imageUrl = '',
    id = '-1',
  ) {
    this.quantity = quantity
    this.price = price
    this.title = title
    this.sum = sum,
    this.imageUrl = imageUrl
    this.id = id
  }
}
export default CartItem
