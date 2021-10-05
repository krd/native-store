import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'
import Modal from 'react-native-modal'
import LottieView from 'lottie-react-native'

const CartScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderProcessing, setOrderProcessing] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()


  const dispatch = useDispatch()

  const cartData = useSelector(state => state.cart)
  const { items, totalAmount } = cartData

  const renderItem = itemData => <CartItem itemData={itemData} {...props} />
  const vals = Object.values(items)

  // setIsLoading(true)

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Has Occurred', error, [{ text: 'Ok' }])
    }

  }, [error])

  // useEffect(()=>{
  //   setIsLoading(true)
  // },[]) 

  const onOrder = useCallback(async (items, totalAmount) => {
    setError(null)
    setIsLoading(true)
      try {
        await dispatch(orderActions.addOrder(items, totalAmount))
        dispatch(cartActions.clearCart())
      } catch (error) {
        setError(error.message)
      }
    setIsLoading(false)
  }, [onOrder])

  // simulate processing...
  // setOrderProcessing(true)
  // setTimeout(() => {
  //   dispatch(orderActions.addOrder(items, totalAmount))
  //   dispatch(cartActions.clearCart())
  //   setOrderProcessing(false)
  // }, 3000)
  // setTimeout(() => setModalVisible(true), 3001)
  // })

  // https://images.unsplash.com/photo-1575898201154-d65111ab78b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3334&q=80
  // https://thumbnails.production.thenounproject.com/_PaKqzIqAj-D3-hONDeVZQwucuw=/fit-in/1000x1000/photos.production.thenounproject.com/photos/75425C5B-4653-4847-976C-0D2EAC0C68E1.jpg

  if (isLoading) {
    return <View style={styles.centeredView}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  }

  const CartItems = (props) => {
    return (
      <View>
        <View style={styles.totalContainer} >
          <Text style={styles.total}>Total: ${Math.round(totalAmount * 100 / 100).toFixed(2)}</Text>
          <Button
            title
            title={'Order Now'}
            buttonStyle={styles.button}
            onPress={() => onOrder(items, totalAmount)}
            disabled={vals.length <= 0}
          />
        </View>
        <FlatList
          data={vals}
          renderItem={renderItem}
          keyExtractor={item => item.title} />
      </View>
    )
  }

  // modalVisible ? {backgroundColor: '#455d88'} : ''

  // const ProcessingModal = props s=> {
  //   return (
  //     <View style={styles.modalContainer}>
  //       <Modal
  //         isVisible={orderProcessing}
  //         hasBackdrop={true}
  //         coverScreen={true}
  //         animationIn='fadeIn'
  //         animationOut='fadeOut'>
  //         <View style={styles.centeredView}>
  //           <LottieView
  //             source={require("../../assets/lottie/thumbs_up.json")}
  //             autoPlay
  //             loop
  //           />
  //         </View>
  //       </Modal>
  //     </View>
  //   )
  // }

  // const SubmitModal = props => {
  //   return (
  //     <View style={styles.modalContainer}>
  //       <Modal
  //         isVisible={modalVisible}
  //         hasBackdrop={false}
  //         coverScreen={true} >
  //         <View style={styles.centeredView}>
  //           <View style={styles.modalView}>
  //             <Text style={styles.modalText}>Your Order Was Successful</Text>
  //             <Pressable
  //               style={[styles.button, styles.buttonClose]}
  //               onPress={() => setModalVisible(!modalVisible)}
  //             >
  //               <Text style={styles.textStyle}>Continue</Text>
  //             </Pressable>
  //           </View>
  //         </View>
  //       </Modal>
  //     </View>
  //   );
  // }

  return (
    <View style={{backgroundColor: 'light-grey'}}>
      {/* <SubmitModal {...props} /> */}
      <CartItems {...props} />
      {/* <ProcessingModal {...props} /> */}
    </View>)
}


const styles = StyleSheet.create({
  totalContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 12,
    marginTop: 120,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 10
  },
  total: {
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
  modalContainer: {
    flex: 1,
    //backgroundColor: 'transparent',
    // backgroundColor: '#455d88',
    backgroundColor: 'lime',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // opacity: 0.25,
    // backgroundColor: '#455d88',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})


export default CartScreen


CartScreen.navigationOptions = (navigationData) => {

  return {
    headerTitle: 'Your Cart',
    headerTransparent: true,
    headerBackTitleVisible: false,
    headerBackVisible: true,
    headerShown: true,
    headerBackVisible: false,
    headerTitleStyle: {
      fontFamily: "lato-bold",
      fontSize: 20,
    },
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : 'transparent'
    },
  }
}

