// import { AsyncStorage } from 'react-native'

import { Weekly } from '@weekly/Weekly'

import { Synced, SyncStatus } from '@weekly/store/Sync'

import { Event } from '@weekly/actions/Event'

import Utils from '@weekly/global/Utils'

export default function (state: Synced<Weekly.Event[]>, action) {
	let newState = state
	const act = action as Event.Action

	switch (action.type) {
		case Event.Type.GET_EVENTS:
			if (act && act.currentDayEvents) {
				newState = {
					...act.currentDayEvents,
				}
			}
			break
		case Event.Type.LOADING:
			newState = { syncStatus: SyncStatus.LOADING }
			break

		case Event.Type.WAIT:
			newState = { syncStatus: SyncStatus.WAITING }
			break

		case Event.Type.ERROR:
			newState = Utils.makeError(action)
			break

		case Event.Type.NONE:
			newState = { syncStatus: SyncStatus.NONE }
			break

		default:
			break

	}

	return newState || null
}
