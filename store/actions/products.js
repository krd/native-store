import Product from '../../models/product'

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'

const PERMISSION_DENIED = 'Permission denied'

export const fetchProducts = () => {
  
  return async (dispatch, getState) => {
    
    const token = getState().authenticated.token
    const userId = getState().authenticated.userId
    const URL = `https://rn-store-472f6-default-rtdb.firebaseio.com/products.json?auth=${token}`

    try {
      const response = await fetch(URL)
      if (!response.ok) {
        throw new Error('Something not going well....')
      }
      const resData = await response.json();

      const loadedProducts = []
      for (const key in resData) {
        let loadedProduct = resData[key]
        loadedProducts.push(new Product(
          key,
          userId,
          loadedProduct.title,
          loadedProduct.imageUrl,
          loadedProduct.description,
          loadedProduct.price
        ))
      }

      dispatch({ type: LOAD_PRODUCTS, products: loadedProducts, userProducts: loadedProducts.filter((product) => product.ownerId === userId) })
    } catch (err) {
      throw err;
    }
  }
}

export const addProduct = (title, description, imageUrl, price, user) => {

  return async (dispatch, getState) => {

    const token = getState().authenticated.token
    const userId = getState().authenticated.userId
    const URL = `https://rn-store-472f6-default-rtdb.firebaseio.com/products.json?auth=${token}`

    try {
      // run async code here...
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
        })
      })
      
      if (!response.ok) {
        throw new Error('There was a problem adding the product.')
      }

      const resData = await response.json();

      // for (const key in resData) {
      //   let loadedProduct = resData[key]
      //   loadedProducts.push(new Product(
      //     key,
      //     userId,
      //     loadedProduct.title,
      //     loadedProduct.imageUrl,
      //     loadedProduct.description,
      //     loadedProduct.price
      //   ))
      // }
      console.log('ADDED PRODUCT DATA: ', resData)

      dispatch(
        {
          type: ADD_PRODUCT,
          productData: {
            id: resData.name,
            title,
            description,
            imageUrl,
            price
          }
        }
      )
    } catch (err) {
      // do something
      throw err;
    }
  }
}

export const editProduct = (id, title, description, imageUrl) => {

  return async (dispatch, getState) => {

    const token = getState().authenticated.token
    const URL = `https://rn-store-472f6-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`

    try {
      const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      })

      if (!response.ok) {
        throw new Error('Unable to update product')
      }

      dispatch(
        {
          type: EDIT_PRODUCT,
          pid: id,
          productData: {
            title,
            description,
            imageUrl
          }
        }
      )
    }
    catch (err) {
      throw err;
    }
  }

}

export const deleteProduct = productId => {
  
  return async (dispatch, getState) => {

    const token = getState().authenticated.token
    const URL = `https://rn-store-472f6-default-rtdb.firebaseio.com/products/${productId}.json??auth=${token}`

    try {
      const response = await fetch(URL, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        const errorResData = await response.json();
        console.log('ERROR...', errorResData)
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'PERMISSION_DENIED') {
          message = 'You do not have the user rights to delete this product.';
        }
        throw new Error(message);
      }


      if(!response.ok) {
        throw new Error('Unable to delete product at this time.')
      }

      dispatch({ type: DELETE_PRODUCT, pid: productId })
    } catch (error) {
      throw error
    }
  }
}