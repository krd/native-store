import React, { useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import * as authActions from '../store/actions/auth'


const StartupScreen = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      console.log('userData from AsyncStorage: ', userData)
      if (!userData) {
        props.navigation.navigate('Auth')
      }

      const transformedData = JSON.parse(userData)
      const { userId, token, expiryDate } = transformedData

      // check expiryDate
      const expirationDate = new Date(expiryDate)
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth')
        return
      }

      // current data/time plus the token's expiresIn value (it's in milliseconds)
      const expirationTime = expirationDate.getTime() - new Date().getTime()
      
      new Date(
        new Date().getTime() + parseInt(expiryDate) * 1000
      )

      // token still valid
      props.navigation.navigate('Shop')
      dispatch(authActions.authenticate(userId, token, expirationTime))
    }
    setTimeout(() => {
      tryLogin()
    }, 1000);

  }, [dispatch])

  return (


    <LinearGradient colors={[Colors.darkColor, Colors.secondary]} style={styles.screen}>
      <ActivityIndicator size='large' color='white' />
    </LinearGradient>

  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'open-sans',
    fontSize: 20,
    color: 'white'
  },
})


export default StartupScreen


