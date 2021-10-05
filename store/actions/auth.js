import AsyncStorage from '@react-native-async-storage/async-storage';
export const LOGOUT = 'LOGOUT'
export const AUTHENTICATE = 'AUTHENTICATE'
export const ASYNC_KEY = 'USER_DATA'

const API_KEY = 'AIzaSyBEiiMDsPdduMSJ4xpUJkgAe85FFdOXLrY'
let timer

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime))
    dispatch({ type: AUTHENTICATE, userId: userId, token: token })
  }
}

export const signUp = (email, password) => {

  const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

  return async (dispatch) => {
    const response = await fetch(SIGNUP_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
          displayName: 'DISPLAY NAME'
        })
      })

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const responseData = await response.json()

    dispatch(authenticate(responseData.localId, responseData.idToken, parseInt(responseData.expiresIn) * 1000))
    // current data/time plus the token's expiresIn value (it's in milliseconds)
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate)
  }
}

export const login = (email, password) => {

  const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

  return async (dispatch, getState) => {
    const response = await fetch(LOGIN_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      })

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }

    const responseData = await response.json()

    dispatch(
      authenticate(
        responseData.localId,
        responseData.idToken,
        parseInt(responseData.expiresIn) * 1000)
    )
    // current data/time plus the token's expiresIn value (it's in milliseconds)
    const expirationDate = new Date(
      new Date().getTime() + parseInt(responseData.expiresIn) * 1000
    )
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate)
  }
}

export const logout = () => {
  clearLogoutTimer()
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    userId: userId,
    token: token,
    expiryDate: expirationDate.toISOString(),
  }))
}