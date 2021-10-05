import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { Alert, View, StyleSheet, KeyboardAvoidingView, ScrollView, Button, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux'
import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth'


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    }
  }
  return state
}

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false
  })

  const authHandler = async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input!', 'Please check the errors in the form.', [{ text: 'Ok' }])
      return
    }
    let action;
    if (isSignup) {
      action = authActions.signUp(formState.inputValues.email, formState.inputValues.password)
    } else {
      action = authActions.login(formState.inputValues.email, formState.inputValues.password)
    }
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(action)
      props.navigation.navigate('Shop')
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      })
    }, [dispatchFormState])

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Has Occurred', error, [{ text: 'Ok' }])
    }
  }, [error])

  // if (isLoading) {
  //   return <View style={styles.centered}>
  //     <ActivityIndicator size='large' color={Colors.primary} />
  //   </View>
  // }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <LinearGradient colors={[Colors.darkColor, Colors.secondary]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            {/* <Input
              id='displayName'
              label='Display Name'
              keyboardType='default'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid Display Name'
              onInputChange={inputChangeHandler}
              placeholder='Your Display Name'
            /> */}
            <Input
              id='email'
              label='E-Mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email address'
              onInputChange={inputChangeHandler}
              placeholder='you@email.com'
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry={true}
              required
              minLength={5}
              autoCapitalize='none'
              errorText='Please enter a valid password'
              onInputChange={inputChangeHandler}
              placeholder='Your password'

            />
            <View style={styles.buttonContainer}>
              {isLoading ? (<ActivityIndicator size='small' color={Colors.primary} />) : (
                <Button
                  title={isSignup ? 'Sign Up' : 'Login'}
                  onPress={authHandler}
                  color={Colors.primary} />)
              }
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                onPress={() => setIsSignup((prevState) => !prevState)}
                color={Colors.darkColor} />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

AuthScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Please Authenticate',
    headerTintColor: Colors.grayBackground,
    headerTransparent: true,
    backgroundColor: 'transparent',
    headerTitleStyle: {
      fontFamily: "lato-bold",
      fontSize: 20,
    },
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    
  },
  buttonContainer: {
    justifyContent: 'center',
    marginVertical: 15,
    marginBottom: 0,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})


export default AuthScreen

// headerLeft: () => (
//   <CustomHeaderButtons>
//     <Item
//       title='Your Orders'
//       iconName='md-menu-sharp'
//       onPress={() => navigation.toggleDrawer()}
//     />
//   </CustomHeaderButtons>
// ),
// headerRight: () => (
//   <CustomHeaderButtons>
//     <Item
//       title='Your Cart'
//       iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//       onPress={() => {
//         navigation.navigate({
//           routeName: 'ShoppingCart',
//         })
//       }}
//     />
//   </CustomHeaderButtons>
// ),