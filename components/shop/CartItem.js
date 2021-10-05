import React from 'react';
import { View, StyleSheet, Alert, Button, Image, Text } from 'react-native';
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import { useDispatch } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CartItem = props => {
  
  const dispatch = useDispatch()

  const { itemData } = props
  const { item } = itemData
 
  return (
    <View style={styles.lineItem}>
      <View style={styles.imageContainer}>
        <Image style={styles.lineItemImage} source={{ uri: item.imageUrl }} />
      </View>
      <Text style={styles.itemDetails}>{item.quantity}</Text>
      <Text style={styles.itemDetails}>{item.title}</Text>
      <Text style={styles.itemDetails}>${item.price}</Text>
      <Ionicons name='trash' onPress={() =>
          dispatch(cartActions.removeFromCart(item))} color={Colors.secondary} size={24} />
    </View>
  )
}
export default CartItem

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    height: 200,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  imageCart: {
    height: 300,
    justifyContent: 'flex-end',
    resizeMode: 'stretch',
  },
  lineItemImage: {
    flex: 1,
    width: '100%',
    height: 40,
    resizeMode: 'contain',
  },
  imageContainer: {
    width: '25%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.title,
    opacity: 0.55
  },
  totalRow: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  total: {
    fontFamily: 'lato-bold',
  },
  lineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#888',
    marginRight: 20,
    marginLeft: 20,
  },
  itemDetails: {
    fontSize: 16,
    fontFamily: 'lato',
  },
  text: {
    color: "white",
    fontSize: 36,
    fontFamily: 'lato',
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#0000008C",
  },
  textCart: {
    color: "white",
    fontSize: 20,
    fontFamily: 'lato',
    lineHeight: 60,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: '#0091adff'
  },
  button: {
    margin: 2,
    borderRadius: 40,
    padding: 4,
    width: '50%',
    backgroundColor: '#0091adff',
    fontSize: 8,
    color: 'white',
    fontFamily: 'lato',
  },
  buttonText: {
    fontSize: 8,
    color: 'red',
    fontFamily: 'lato',
    backgroundColor: 'transparent',
  },
})
