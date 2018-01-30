import { Synced } from '@weekly/store/Sync'

// import { Synced } from '@weekly/store/Sync'
declare module '@weekly/Weekly' {

	namespace Weekly {
		interface State {
			currentDayEvents: Synced<Weekly.Event[]>
		}
	}
}
