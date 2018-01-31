import { Weekly } from '@weekly/Weekly'

import { Synced, SyncStatus } from '@weekly/store/Sync'

import { Creation } from '@weekly/actions/Creation'

import Utils from '@weekly/global/Utils'

export default function (state: Synced<Weekly.Event>, action) {
	let newState = state
	const act = action as Creation.Action

	switch (action.type) {
		case Creation.Type.REGISTER:

			if (act && act.creation) {
				newState = act.creation
			}

			break

		case Creation.Type.REMOVE:

			if (act && act.creation) {
				newState = act.creation
			}
			break
		case Creation.Type.LOADING:
			newState = { syncStatus: SyncStatus.LOADING }
			break

		case Creation.Type.WAIT:
			newState = { syncStatus: SyncStatus.WAITING }
			break

		case Creation.Type.NONE:
			newState = { syncStatus: SyncStatus.NONE }
			break

		case Creation.Type.RELOAD:
			newState = { syncStatus: SyncStatus.RELOAD }
			break

		case Creation.Type.ERROR:
			newState = Utils.makeError(action)
			break
		default:
			break

	}

	return newState || null
}
