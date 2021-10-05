import React from 'react'
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import { CustomHeaderButtons, Item } from '../../components/UI/HeaderButton'

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam('productId')
  const dispatch = useDispatch()

  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  )

  console.log('LOADED PRODUCT: ', selectedProduct)

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title='Add to Cart' onPress={() => { dispatch(cartActions.addToCart(selectedProduct)) }} />
      </View>
      <Text style={styles.price}>${(+selectedProduct.price).toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

ProductDetailScreen.navigationOptions = (navigationData) => {
  const { navigation } = navigationData
  return {
    headerTitle: 'ITEM DETAILS',
    headerTintColor: Colors.primary,
    headerBackTitleVisible: false,
    headerTitleStyle: {
      fontFamily: "lato-bold",
      fontSize: 20,
    },
    headerRight: () => (
      <CustomHeaderButtons>
        <Item
          title='Your Cart'
          iconName='ios-cart'
          onPress={() => navigation.navigate({
            routeName: 'ShoppingCart',
          })}
        />
      </CustomHeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
    // overflow: 'hidden'
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  button: {
    // color: Colors.primary,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'lato',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'lato',
  }
})

export default ProductDetailScreen
