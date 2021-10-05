import React from 'react'
import { useFonts } from 'expo-font'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'
import ShopNavigator from './navigation/ShopNavigator'
import AppLoading from 'expo-app-loading'
import { enableScreens } from 'react-native-screens'
// import { composeWithDevTools } from 'redux-devtools-extension'
import middleware from './middleware'
import NavigationContainer from './navigation/NavigationContainer'

enableScreens()

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  authenticated: authReducer,
})

// store = createStore(rootReducer, composeWithDevTools())
store = createStore(rootReducer, middleware)

export default function App() {

  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'lato': require('./assets/fonts/Lato-Regular.ttf'),
    'lato-bold': require('./assets/fonts/Lato-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  )
}
