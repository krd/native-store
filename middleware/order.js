import { ADD_ORDER } from '../store/actions/order'

const orderProcessor = (store) => (next) => (action) => {
  if (action.type === ADD_ORDER) {
    const afterAction = next(action)
    return afterAction
  }
  // return next(action)
}
export default orderProcessor