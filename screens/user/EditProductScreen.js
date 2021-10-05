import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux'
import { CustomHeaderButtons, Item } from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products'
import Input from '../../components/UI/Input'

// https://images.unsplash.com/photo-1611255518888-30feae5f15b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=954&q=80
// https://images.unsplash.com/photo-1605595988901-3d06601c38ad?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8cVBZc0R6dkpPWWN8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60
// https://images.unsplash.com/photo-1503925802536-c9451dcd87b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2340&q=80

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

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const productId = props.navigation.getParam('productId')
  const editedProduct = useSelector(state => state.products.userProducts.find((prod) => prod.id === productId))
  const currentUser = useSelector(state => {
    return state.authenticated.user;})
  
  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      description: editedProduct ? editedProduct.description : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      description: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false
  })

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Has Occurred', error, [{ text: 'Ok' }])
    }

  }, [error])

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input!', 'Please check the errors in the form.', [{ text: 'Ok' }])
      return
    }
    setError(null)
    setIsLoading(true)
    try {
      if (editedProduct) {
        await dispatch(
          productActions.editProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        )
      } else {
        await dispatch(
          productActions.addProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
            currentUser
          )
        )

      }
      props.navigation.goBack()
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)

  }, [dispatch, productId, formState])

  useEffect(() => {
    // passes function to navigationOptions
    props.navigation.setParams({ submit: submitHandler })
  }, [submitHandler])

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      })
    }, [dispatchFormState])

  if (isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='next'
            errorText='Please enter a valid title'
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
          />
          <Input
            id='description'
            label='Description'
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='next'
            errorText='Please enter a valid description'
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
          />
          <Input
            id='imageUrl'
            label='Image Url'
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='next'
            errorText='Please enter a valid Image Url'
            autoCorrect
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
          />{editedProduct ? null : (
            <Input
              id='price'
              label='Price'
              keyboardType='decimal-pad'
              autoCapitalize='sentences'
              returnKeyType='next'
              errorText='Please enter a valid title'
              onInputChange={inputChangeHandler}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default EditProductScreen

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginVertical: 100,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorText: {
    fontFamily: 'lato',
    color: 'red',
    fontSize: 24
  }
})

EditProductScreen.navigationOptions = (navigationData) => {

  const submitFn = navigationData.navigation.getParam('submit')

  return {
    headerTitle: (navigationData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product'),
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
    headerRight: () => (
      <CustomHeaderButtons>
        <Item
          title='Save'
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFn}
        />
      </CustomHeaderButtons>
    ),
  }
}