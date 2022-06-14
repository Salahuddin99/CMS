import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  projectListReducer,
  projectCreateReducer,
  projectDeleteReducer,
  projectDetailsReducer,
  projectUpdateReducer,
} from './reducers/projectReducer'

import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  projectStartReducer,
  userNGOreqReducer,
} from './reducers/userReducer'
import {
  donationCreateReducer,
  PaymentReducer,
  donationDetailsReducer,
  donationMineListReducer,
  donationListReducer,
  donationDeleteReducer,
} from './reducers/paymentReducer'

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const savePayment = localStorage.getItem('savePayment')
  ? JSON.parse(localStorage.getItem('savePayment'))
  : {}

const Items = localStorage.getItem('Items')
  ? JSON.parse(localStorage.getItem('Items'))
  : {}

const initialState = {
  userLogin: { userInfo },
  payment: { savePayment, Items },
}
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userDetail: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  updateProfile: userUpdateProfileReducer,
  listNGO: userNGOreqReducer,
  projectList: projectListReducer,
  projectCreate: projectCreateReducer,
  projectDelete: projectDeleteReducer,
  projectDetails: projectDetailsReducer,
  projectUpdate: projectUpdateReducer,
  ProjectStart: projectStartReducer,
  payment: PaymentReducer,
  donationCreate: donationCreateReducer,
  donationDetail: donationDetailsReducer,
  donationMineList: donationMineListReducer,
  donationList: donationListReducer,
  donationDelete: donationDeleteReducer,
})

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
