import { Weekly } from '@weekly/Weekly'
import { SyncStatus } from '@weekly/store/Sync'
const none = { syncStatus: SyncStatus.NONE }

const initialState: Weekly.State = {
	currentDayEvents: none,
}

export default initialState
