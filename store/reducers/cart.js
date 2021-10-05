import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, INCREASE_ITEM_COUNT, } from '../actions/cart'
import CartItem from '../../models/cart-item'
import { DELETE_PRODUCT } from '../actions/products'

const initialState = {
  items: {},
  totalAmount: 0
}

export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_TO_CART:
      const addedProduct = action.product
      const price = addedProduct.price
      const title = addedProduct.title
      const imageUrl = addedProduct.imageUrl
      const id = (addedProduct.id !== '-1' ? addedProduct.id : '-1')

      let productToAddOrUpdate

      if (state.items[addedProduct.id]) {
        // in cart already.  update the cart total
        productToAddOrUpdate = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          price,
          title,
          state.items[addedProduct.id].sum + price,
          imageUrl,
          id,
        )
      } else {
        productToAddOrUpdate = new CartItem(1, price, title, price, imageUrl, id)
      }
      // if only have items and totalAmount in state, you don't need to spread all of state
      return {
        ...state,
        items: {
          ...state.items,
          [id]: productToAddOrUpdate
        },
        totalAmount: state.totalAmount + price
      }
    case REMOVE_FROM_CART:
      const items = state.items
      const { product } = action
      const newTotalAmount = state.totalAmount - product.price * product.quantity
      delete items[product.id]
      return { ...state, items, totalAmount: newTotalAmount }
    case CLEAR_CART:
      const clearedCart = { ...state }
      clearedCart.totalAmount = 0
      clearedCart.items = []
      return clearedCart
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) { return state }
      const updatedItems = { ...state.items }
      delete updatedItems[action.pid]
      const itemTotal = state.items[action.pid].sum
      return { ...state, items: updatedItems, totalAmount: state.totalAmount - itemTotal }
    case INCREASE_ITEM_COUNT:
      return state
    default:
      return state
  }
}
