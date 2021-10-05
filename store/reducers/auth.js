import { LOGOUT, AUTHENTICATE } from '../actions/auth'

initialState = {
  userId: null,
  token: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: 
      return { userId: action.userId, token: action.token }
    case LOGOUT:
      return initialState  
    default:
      return state
  }
}