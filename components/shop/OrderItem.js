import React from 'react';
import { View, StyleSheet, Alert, Button, Image, Text } from 'react-native';
import Colors from '../../constants/Colors'

const OrderItem = props => {

  const { item } = props.item

  return (
    <View style={styles.orderItemContainer}>
      <View style={styles.lineItem}>
        <View style={styles.imageContainer}>
          <Image style={styles.lineItemImage} source={{ uri: item.imageUrl }} />
        </View>
        <Text style={styles.itemDetails}>{item.quantity}</Text>
        <Text style={styles.itemDetails}>{item.title}</Text>
        <Text style={styles.itemDetails}>${item.price}</Text>
      </View>
    </View>
  )
}
export default OrderItem

const styles = StyleSheet.create({
  orderItemContainer: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 50,
    margin: 5,
    // backgroundColor: '#f7f0ab',
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    padding: 4
  },
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
  },
  itemDetails: {
    fontSize: 12,
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
