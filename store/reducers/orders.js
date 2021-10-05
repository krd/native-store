import { CANCEL_ORDER, GET_ORDERS, ADD_ORDER } from '../actions/orders'
import Order from '../../models/order'

initialState = {
  orders: []
}

export default (state = initialState, action) => {

  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.ownerId,
        action.orderData.items,
        action.orderData.total,
        action.orderData.date
      )
      return { orders: state.orders.concat(newOrder)}
    case CANCEL_ORDER:
      return state
    case GET_ORDERS:
      const { orders } = action
      return { orders }
    default:
      return state
  }
}