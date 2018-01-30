enum SyncStatus {
	NONE = 'SyncStatus.NONE',
	LOADING = 'SyncStatus.LOADING',
	ERROR = 'SyncStatus.ERROR',
	WAITING = 'SyncStatus.WAITING',
	RELOAD = 'SyncStatus.RELOAD',
}

interface Sync<T> {
	oldData?: T,
	errorMessage?: string
	error?: any
	syncStatus: SyncStatus
}

type Synced<T> = T | Sync<T>

function isSynced<T>(t: Synced<T>): t is T {
	return (t as Sync<T>).syncStatus === undefined
}

function isLoading<T>(t: Synced<T>): t is Sync<T> {
	return (t as Sync<T>).syncStatus === SyncStatus.LOADING
}

function isError<T>(t: Synced<T>): t is Sync<T> {
	return (t as Sync<T>).syncStatus === SyncStatus.ERROR
}

function isWaiting<T>(t: Synced<T>): t is Sync<T> {
	return (t as Sync<T>).syncStatus === SyncStatus.WAITING
}

function isNone<T>(t: Synced<T>): t is Sync<T> {
	return (t as Sync<T>).syncStatus === SyncStatus.NONE
}

function shouldReload<T>(t: Synced<T>): t is Sync<T> {
	return (t as Sync<T>).syncStatus === SyncStatus.RELOAD
}

export {
	Sync,
	Synced,
	SyncStatus,
	isSynced,
	isWaiting,
	isLoading,
	isError,
	isNone,
	shouldReload,
}
