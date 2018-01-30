declare module '@weekly/Weekly' {
	namespace Weekly {
		interface Event {
			name: string,
			description: string,
			date?: string
			time?: string
		}
	}
}
