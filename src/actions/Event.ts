import { Synced } from '@weekly/store/Sync'
import { Weekly } from '@weekly/Weekly'
import { AsyncStorage } from 'react-native'

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

	export function getDayEvents({ date }: {
		date: string,
	}) {
		return async function (dispatch) {
			dispatch({ type: Event.Type.LOADING })

			try {
				const previousData = await AsyncStorage.getItem(date)
				const currentDayEvents = previousData ? await JSON.parse(previousData) : []

				const action: Event.Action = {
					currentDayEvents,
					type: Event.Type.GET_EVENTS,
				}

				dispatch(action)
			} catch (error) {
				dispatch({ error, type: Event.Type.ERROR })
			}
		}
	}
}

export default Event
