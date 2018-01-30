import { Synced } from '@weekly/store/Sync'
import { Weekly } from '@weekly/Weekly'
// import { AsyncStorage } from 'react-native'

export namespace Event {
	export enum Type {
		GET_EVENTS = 'Event.GET_EVENTS',
		ERROR = 'Event.ERROR',
		LOADING = 'Event.LOADING',
		WAIT = 'Event.WAITING',
		NONE = 'Event.NONE',
	}

	export interface Action {
		type: Event.Type
		currentDayEvents: Synced<Weekly.Event[]>
	}

	export function getDayEvents({ _date }: {
		_date: any,
	}) {
		return async function (dispatch) {
			dispatch({ type: Event.Type.LOADING })

			try {
				// AsyncStorage.removeItem('user').then(() => {
				// 	dispatch({ type: Auth.Type.LOGOUT })
				// })
				console.log('bla')
			} catch (error) {
				dispatch({ error, type: Event.Type.ERROR })
			}
		}
	}
}

export default Event
