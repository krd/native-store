import Order from '../../models/order'

export const ADD_ORDER = 'ADD_ORDER'
export const CANCEL_ORDER = 'CANCEL_ORDER'
export const GET_ORDERS = 'GET_ORDERS'

export const addOrder = (cartItems, totalAmount) => {

  return async (dispatch, getState) => {

    const date = new Date()
    const token = getState().authenticated.token
    console.log('AUTH TOKEN: ', token)
    const userId = getState().authenticated.userId
    const URL = `https://rn-store-472f6-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`

    try {
      // run async code here...
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAmount,
          userId,
          date: date.toISOString(),
          items: cartItems
        })
      })
 
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error;
        let message = 'There was an error placing your order';
        if (errorId === 'EMAIL_NOT_FOUND') {
          message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
          message = 'This password is not valid!';
        }
        throw new Error(message);
      }

      const resData = await response.json();
      console.log('RESPONSE DATA: ', resData)
      dispatch(
        {
          type: ADD_ORDER,
          orderData: {
            id: resData.name,
            ownerId: userId,
            items: cartItems,
            total: totalAmount,
            date: date
          }
        }
      )
    } catch (err) {
      // do something
      throw err;
    }
  }
}

export const getOrders = () => {
  
  return async (dispatch, getState) => {
   
    const token = getState().authenticated.token
    const userId = getState().authenticated.userId
    const URL = `https://rn-store-472f6-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`

    try {
      const response = await fetch(URL)
      if (!response.ok) {
        throw new Error('Unable to Retrieve Order History')
      }
      const resData = await response.json()
      const loadedOrders = []
      for (const key in resData) {
        const loadedOrder = resData[key]
        loadedOrders.push(new Order(
          key,
          loadedOrder.items,
          loadedOrder.totalAmount,
          loadedOrder.orderDate
        ))
      }
      dispatch({ type: GET_ORDERS, orders: loadedOrders })
    } catch (error) {
      throw error
    }
  }
}
