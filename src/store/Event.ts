declare module '@weekly/Weekly' {
	namespace Weekly {
		interface Event {
			id: string,
			name: string,
			description: string,
			date?: string
			time?: string
		}
	}
}
