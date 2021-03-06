import { Navigation } from 'react-native-navigation'

/* Calendar */
import ProductDetail from '@weekly/views/Calendar/Home'

/* Event */
import Form from '@weekly/views/Event/Form'

export function registerScreens(store, provider) {

	/* Calendar */
	Navigation.registerComponent('calendar.Home', () => ProductDetail, store, provider)

	/* Event */
	Navigation.registerComponent('event.Form', () => Form, store, provider)

}
