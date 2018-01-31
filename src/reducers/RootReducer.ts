import { Weekly } from '@weekly/Weekly';
import { AnyAction, combineReducers } from 'redux'

import eventReducer from '@weekly/reducers/Event'
import creationReducer from '@weekly/reducers/Creation'

const combinedReducer = combineReducers<Weekly.State>({
	creation: creationReducer,
	currentDayEvents: eventReducer,
})

const rootReducer = (state: Weekly.State, action: AnyAction): Weekly.State => {
	return combinedReducer(state, action)
}

export default rootReducer
