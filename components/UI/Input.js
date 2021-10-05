import React, { useReducer, useEffect } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
  // console.log('ACTION TYPE: ', action.type)
  switch (action.type) {
    case INPUT_CHANGE:
      // console.log('INPUT_CHANGE: ', [action.value, action.isValid])
      return { ...state, value: action.value, isValid: action.isValid }
    case INPUT_BLUR:
      return { ...state, touched: true }
    default:
      return state
  }
}

const Input = props => {

  // create initial state
  const [inputState, dispatchInputState] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false
  })

  const { onInputChange, id } = props

  useEffect(() => {
    // console.log('useEffect with: ', inputState)
    if (inputState.touched) {
      // console.log('passing to onInputChange: ', [id, inputState.value, inputState.isValid])
      onInputChange(id, inputState.value, inputState.isValid)
    }
  }, [inputState, onInputChange, id])

  const textChangeHandler = (text) => {
    // console.log('Text change handler with: ', text)
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    // console.log('required? ', props.required)
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatchInputState({ type: INPUT_CHANGE, value: text, isValid: isValid })
  }

  const lostFocusHandler = () => {
    dispatchInputState({ type: INPUT_BLUR })
  }


  return (
    <View style={styles.fieldRow}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  )
}
export default Input

Input.navigationOption = navigationData => {
  return {

  }
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'lato-bold',
    fontSize: 16,
    color: Colors.secondary,
    marginVertical: 8,
  },
  fieldRow: {
    width: '100%',
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBackground,
    paddingHorizontal: 4,
    paddingVertical: 5,
    fontSize: 16,
    fontFamily: 'lato'
  },
  errorText: {
    color: 'red',
  },
  errorContainer: {
    marginVertical: 5
  },
})