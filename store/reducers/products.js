import { ADD_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, LOAD_PRODUCTS } from '../actions/products'
import Product from '../../models/product'

const initialState = {
  availableProducts: [],
  userProducts: []
}

export default (state = initialState, action) => {

  // https://images.unsplash.com/photo-1575402473489-5eedc5d87301?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1364&q=80

  switch (action.type) {
    case ADD_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      )
      return {
         ...state, 
         availableProducts: state.availableProducts.concat(newProduct), 
         userProducts:  state.userProducts.concat(newProduct)
        }
    
    case LOAD_PRODUCTS: 
      return {...state, availableProducts: action.products, userProducts: action.userProducts}  

    case EDIT_PRODUCT:
      const productIndex = state.userProducts.findIndex((prod) => prod.id === action.pid)
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price,
      )
      
      const updatedUserProducts = [...state.userProducts]
      updatedUserProducts[productIndex] = updatedProduct

      const availableProductIndex = state.availableProducts.findIndex((prod) => prod.id === action.pid)
      const updatedAvailableProducts = [...state.availableProducts]
      updatedAvailableProducts[availableProductIndex] = updatedProduct
    
      return {
         ...state, 
         availableProducts: updatedAvailableProducts, 
         userProducts: updatedUserProducts 
        }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter((product) => product.id !== action.pid),
        availableProducts: state.availableProducts.filter(product => product.id !== action.pid)
      }
    default:
      return state
  }
}
