import { Navigation } from 'react-native-navigation'

/* Calendar */
import ProductDetail from '@weekly/views/Calendar/Home'

export function registerScreens(store, provider) {

	/* Calendar */
	Navigation.registerComponent('calendar.Home', () => ProductDetail, store, provider)

}
