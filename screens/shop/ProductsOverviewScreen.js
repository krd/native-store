import React, { useEffect, useState, useCallback } from 'react'
import { FlatList, Platform, View, Button, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { CustomHeaderButtons, Item } from '../../components/UI/HeaderButton'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/products'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const products = useSelector(state => state.products.availableProducts)

  // rnUnfCSIuQeCfU9f8iHUdhVzm8B3
  const dispatch = useDispatch()

  const loadProducts = useCallback(async () => {
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(productActions.fetchProducts())
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, [dispatch, setIsLoading, setError])

  // Re-Fetch the latest product data from
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('willFocus', loadProducts)

    return () => {
      unsubscribe.remove()
    }
  }, [loadProducts])

  useEffect(() => {
    loadProducts()
  }, [dispatch, loadProducts])

  const onSelectHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    })
  }

  if (error) {
    return <View style={styles.centered}>
      <Text style={styles.errorText}>
        {error}
      </Text>
      <Button title='Reload..' onPress={loadProducts} />
    </View>
  }

  if (isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  }

  if (!isLoading && products.length === 0) {
    return <View style={styles.centered}>
      <Text style={styles.errorText}>
        No products found.  Start adding some...
      </Text>
    </View>
  }

  return (
    <View style={styles.centered}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={(itemData) => (
          (
            <ProductItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              onSelect={() => onSelectHandler(itemData.item.id, itemData.item.title)}
            >
              <Button
                color={Colors.primary}
                title='View Details'
                onPress={() => onSelectHandler(itemData.item.id, itemData.item.title)}
              />
              <Button
                color={Colors.primary}
                title='Add To Cart'
                onPress={() => dispatch(cartActions.addToCart(itemData.item))}
              />
            </ProductItem>
          )
        )}
      />
    </View>
  )
}

ProductsOverviewScreen.navigationOptions = (navigationData) => {
  const { navigation } = navigationData
  return {
    headerTitle: 'PRODUCTS',
    headerTintColor: Colors.primary,
    headerBackTitleVisible: false,
    headerTitleStyle: {
      fontFamily: "lato-bold",
      fontSize: 20,
    },
    headerLeft: () => (
      <CustomHeaderButtons>
        <Item
          title='Your Orders'
          iconName='md-menu-sharp'
          onPress={() => navigation.toggleDrawer()}
        />
      </CustomHeaderButtons>
    ),
    headerRight: () => (
      <CustomHeaderButtons>
        <Item
          title='Your Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
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
    justifyContent: 'center',
  },
  errorText: {
    fontFamily: 'lato',
    color: 'red',
    fontSize: 24
  }
})


export default ProductsOverviewScreen

