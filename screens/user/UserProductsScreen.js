import React from 'react'
import { View, Text, StyleSheet, FlatList, Button, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { CustomHeaderButtons, Item } from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import ProductItem from '../../components/shop/ProductItem'
import * as productActions from '../../store/actions/products'

const UserProductsScreen = props => {

  const userProducts = useSelector(state => state.products.userProducts)
  const allProducts = useSelector(state => state.products.availableProducts)

  const dispatch = useDispatch()

  const onEditHandler = (id) => {
    props.navigation.navigate('EditProduct', { productId: id })
  }

  const renderItem = itemData => {
    const { item } = itemData
    return (
      <ProductItem
        image={item.imageUrl}
        title={item.title}
        price={item.price}
        onPress={() => onEditHandler(item.id)}
      >
        <Button
          color={Colors.primary}
          title='Edit'
          onPress={() => onEditHandler(item.id)}
        />
        <Button
          color={Colors.primary}
          title='Delete'
          onPress={() => { dispatch(productActions.deleteProduct(item.id)) }}
        />
      </ProductItem>
    )
  }

  if(userProducts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          No products found.  Add some today!
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={userProducts} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  )
}
export default UserProductsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'lato-bold',
    fontSize: 20,
  }
})

UserProductsScreen.navigationOptions = (navigationData) => {
  const { navigation } = navigationData
  return {
    headerTitle: 'Your Products',
    headerTintColor: Colors.primary,
    headerBackTitleVisible: false,
    headerTitleStyle: {
      fontFamily: "lato-bold",
      fontSize: 20,
    },
    headerLeft: () => (
      <CustomHeaderButtons>
        <Item
          title='Menu'
          iconName='md-menu-sharp'
          onPress={() => navigation.toggleDrawer()}
        />
      </CustomHeaderButtons>
    ),
    headerRight: () => (
      <CustomHeaderButtons>
        <Item
          title='Add Product'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navigation.navigate('EditProduct',)
          }}
        />
      </CustomHeaderButtons>
    ),
  }
}