import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Alert, RefreshControl } from 'react-native';
import Colors from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { CustomHeaderButtons, Item } from '../../components/UI/HeaderButton'
import OrderDetails from '../../components/shop/OrderDetails';
import * as orderActions from '../../store/actions/orders'

const OrdersScreen = props => {

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const orders = useSelector(state => state.orders.orders)
  const dispatch = useDispatch()

  const loadOrders = useCallback(async () => {
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(orderActions.getOrders())
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('willfocus', loadOrders)
    return () => {
      unsubscribe.remove()
    }
  }, [loadOrders])

  useEffect(() => {
    loadOrders()
  }, [dispatch, loadOrders])

  const renderItem = itemData => {
    return (
      <OrderDetails orderDetails={itemData.item} />
    )
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadOrders()
    setRefreshing(false)
  }, []);

  if (error) {
    return <View style={styles.centered}>
      <Text style={styles.errorText}>
        {error}
      </Text>
    </View>
  }

  if (isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  }

  if (!isLoading && (orders !== undefined && orders.length === 0)) {
    return <View style={styles.centered}>
      <Text style={styles.errorText}>
        No orders found.  Shop Now!
      </Text>
    </View>
  }

  return (
    <View style={styles.ordersContainer}>
      <View>
        <FlatList data={orders} renderItem={renderItem} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } />
      </View>

    </View>
  )
}
export default OrdersScreen

OrdersScreen.navigationOptions = (navigationData) => {
  const { navigation } = navigationData
  return {
    headerTitle: 'ORDER HISTORY',
    headerTintColor: Colors.primary,
    headerBackTitleVisible: false,
    headerTitleStyle: {
      fontFamily: "lato-bold",
      fontSize: 20,
    },
    headerLeft: () => (
      <CustomHeaderButtons>
        <Item
          title='Shop'
          iconName='md-menu-sharp'
          onPress={() => navigation.toggleDrawer()}
        />
      </CustomHeaderButtons>
    ),
    headerRight: () => (
      <CustomHeaderButtons>
        <Item
          title='Cart'
          iconName='md-cart'
          onPress={() => {
            navigation.navigate({
              routeName: 'ShoppingCart',
            })
          }}
        />
      </CustomHeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    fontFamily: 'lato',
    color: 'red',
    fontSize: 24
  },
  text: {
    color: Colors.secondary,
    fontFamily: 'lato',
    fontSize: 20,
  },
  ordersContainer: {
    flex: 1,
    marginTop: 30
  },
  orderHeaders: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 4,
  },
  order: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20
  },
})