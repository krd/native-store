import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import ShopNavigator from './ShopNavigator';
import { NavigationActions } from 'react-navigation'

const NavigationContainer = props => {
  const navRef = useRef()
  const isAuth = useSelector(state => !!state.authenticated.token)

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(NavigationActions.navigate({ routeName: 'Auth' }))
    }
  },[isAuth])


  return (
    <ShopNavigator ref={navRef} />
  )
}

export default NavigationContainer