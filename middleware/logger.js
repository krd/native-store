const logger = (store) => (next) => (action) => {
  console.group()
    console.log('=====================================================')
    console.log(' THE ACTION: ', action)
    console.log('=====================================================')
    const returnValue = next(action)
    console.log('=====================================================')
    console.log('NEW STATE: ', store.getState())
    console.log('=====================================================')
  console.groupEnd()
  return returnValue
} 
export default logger