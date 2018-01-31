import { Navigation } from 'react-native-navigation'

namespace Navigation {
	const navigatorStyle = {
		// navBarTextColor: 'white',
		// navBarButtonColor: 'white',
		// drawUnderNavBar: true,
		// navBarTranslucent: true,
		// navBarTransparent: true,
		// tabBarHidden: true,
	}

	export function push(navigator, screen, title?, props?, navStyle?) {
		const style = navStyle !== undefined ? navStyle : navigatorStyle

		navigator.push({
			title,
			screen,
			navigatorStyle: {
				...style,
			},
			animated: true,
			passProps: props,
			animationType: 'slide-horizontal',
		})
	}

	export function dismissModal(navigator) {
		navigator.dismissModal({
			animationType: 'slide-down',
		})
	}

	export function showModal(navigator, screen, title?, props?, navStyle?) {
		const style = navStyle !== undefined ? navStyle : navigatorStyle

		navigator.showModal({
			title,
			screen,
			navigatorStyle: {
				...style,
			},
			animated: false,
			passProps: props,
			animationType: 'slide-up',
		})
	}

	export function popToRoot(navigator) {
		navigator.popToRoot({
			animated: true,
			animationType: 'slide-horizontal',
		})
	}

	export function pop(navigator) {
		navigator.pop({
			animated: true,
			animationType: 'slide-horizontal',
		})
	}

	export function resetTo(navigator, screen, title?, props?, navStyle?) {
		const style = navStyle !== undefined ? navStyle : navigatorStyle

		navigator.resetTo({
			screen,
			title,
			animated: true,
			animationType: 'fade',
			passProps: props,
			navigatorStyle: {
				...style,
			},
		})
	}


}

export default Navigation
