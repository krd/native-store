import React from 'react'
import { Platform, SafeAreaView, Button, View } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import Colors from '../constants/Colors'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import CartScreen from '../screens/shop/CartScreen'
import AuthScreen from '../screens/user/AuthScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import StartupScreen from '../screens/StartupScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EditProductScreen from '../screens/user/EditProductScreen'
import { useDispatch } from 'react-redux'
import * as authActions from '../store/actions/auth'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    ShoppingCart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions,
  })

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions,
  })

const AdminNavigator = createStackNavigator(
  {
    Admin: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions,
  }
)

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  Admin: AdminNavigator,
},
  {
    contentOptions: {
      activeTintColor: Colors.accent,
      inactiveTintColor: 'white',
      labelStyle: {
        fontFamily: 'lato-bold'
      }
    },
    drawerBackgroundColor: Colors.darkColor,
    drawerPosition: 'left',
    contentComponent: props => {
      const dispatch = useDispatch()
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerNavigatorItems {...props} />
            <Button title='Logout' color={Colors.primary}
             onPress={() => {
               dispatch(authActions.logout())
             }} />
          </SafeAreaView>
        </View>
      )
    },
  })

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
}, {
  defaultNavOptions: defaultNavOptions
})

export default createAppContainer(MainNavigator)
