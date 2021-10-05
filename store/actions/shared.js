// import { getInitialData } from '../utils/api'
// import { setAuthedUser } from './authedUser'
// import { getQuestions } from './questions'
// import { getUsers } from './users'
import { loadProducts } from './products'

const AUTHED_ID = 'footilicious'

export function handleInitialData(action) {
    return (dispatch) => {
        console.log('in handleIntialData with action: ', action)
        return getInitialData().then(({ products }) => {
            // dispatch(getUsers(users))
            // dispatch(setAuthedUser(AUTHED_ID))
            // dispatch(getQuestions(questions))       
            dispatch(loadProducts(products))
        })
    }
}