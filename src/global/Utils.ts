import { Synced, Sync, isSynced, SyncStatus } from '@weekly/store/Sync'

namespace Utils {
	export function makeError<T>(action: any, oldState?: Synced<T>, errorMessage?: string): Sync<T> {
		const newState: Sync<T> = {
			errorMessage: errorMessage || 'Erro desconhecido',
			syncStatus: SyncStatus.ERROR,
		}

		if ('error' in action) {
			newState.error = action.error
		}

		if (!errorMessage && newState.error && 'message' in newState.error) {
			newState.errorMessage = newState.error.message
		}

		if (oldState) {
			newState.oldData = isSynced(oldState) ? oldState : undefined
		}

		return newState
	}
}

export default Utils
