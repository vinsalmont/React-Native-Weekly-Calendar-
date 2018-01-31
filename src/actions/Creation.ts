import { AsyncStorage } from 'react-native'
import { Synced } from '@weekly/store/Sync'
import { Weekly } from '@weekly/Weekly'

export namespace Creation {
	export enum Type {
		REGISTER = 'Creation.REGISTER',
		REMOVE = 'Creation.REMOVE',
		LOADING = 'Creation.LOADING',
		ERROR = 'Creation.ERROR',
		WAIT = 'Creation.WAITING',
		NONE = 'Creation.NONE',
		RELOAD = 'Creation.RELOAD',
	}

	export interface Action {
		type: Creation.Type,
		creation: Synced<Weekly.Event>
	}

	export function createEvent({ event }: {
		event: Weekly.Event,
	}) {
		return async function (dispatch) {
			try {
				const previousData = await AsyncStorage.getItem(event.date)
				const dayEvents = previousData ? await JSON.parse(previousData) : []
				event.id = event.name + '-' + event.date + '-' + event.time
				dayEvents.push(event)

				AsyncStorage.setItem(event.date, JSON.stringify(dayEvents)).then(() => {
					const action: Creation.Action = {
						creation: event,
						type: Creation.Type.REGISTER,
					}

					dispatch(action)
				})
			} catch (error) {
				dispatch({ error, type: Creation.Type.ERROR })
			}
		}
	}

	export function remove({ event }: {
		event: Weekly.Event,
	}) {
		return async function (dispatch) {
			try {
				const previousData = await AsyncStorage.getItem(event.date)
				const dayEvents = previousData ? await JSON.parse(previousData) : []

				const newDaysEvents = dayEvents.filter((x) => x.id !== event.id)

				AsyncStorage.setItem(event.date, JSON.stringify(newDaysEvents)).then(() => {
					const action: Creation.Action = {
						creation: event,
						type: Creation.Type.REMOVE,
					}

					dispatch(action)
				})
			} catch (error) {
				dispatch({ error, type: Creation.Type.ERROR })
			}
		}
	}
}

export default Creation
