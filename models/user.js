import uuid from 'react-native-uuid'

export class User {
  constructor(
    // userName = 'sqeaker',
    // firstName = 'zoey',
    // lastName = 'dyer',
    email = 'zoey.dyer@gmail.com',
    id = '-1',
    idToken = '-',
    refreshToken = '-',
    expiresIn = '-',
    displayName = 'Anonymous User'
  ) {
    // this.userName = userName
    // this.firstName = firstName
    // this.lastName = lastName
    this.email = email
    this.id = id,
    this.idToken = idToken,
    this.refreshToken = refreshToken,
    this.expiresIn = expiresIn
    this.displayName = displayName
  }
}
export default User