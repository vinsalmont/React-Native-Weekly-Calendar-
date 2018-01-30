import { Weekly } from '@weekly/Weekly'
import { applyMiddleware, Store } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '@weekly/reducers/RootReducer'
import Reactotron from 'reactotron-react-native'

const middleware = [thunk]

function configureStore(initialState): Store<Weekly.State> {
	return (Reactotron as any).createStore(
		rootReducer,
		initialState,
		applyMiddleware(...middleware),
	)
}

export {
	configureStore,
}
