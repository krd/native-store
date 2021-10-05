export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const INCREASE_ITEM_COUNT = 'INCREASE_ITEM_COUNT'

export const addToCart = product => {
  return { type: ADD_TO_CART, product: product }
}

export const removeFromCart = product => {
  return { type: REMOVE_FROM_CART, product: product }
}

export const clearCart = items => {
  return { type: CLEAR_CART, items: items }
}

export const increaseItemCount = product => {
  return { type: INCREASE_ITEM_COUNT, product: product }
}