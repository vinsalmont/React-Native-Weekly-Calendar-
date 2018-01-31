import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'

namespace Navigation {
	const navigatorStyle = {
		navBarTextColor: '#053D4E',
		navBarButtonColor: '#053D4E',
		navBarNoBorder: true,
		drawUnderNavBar: true,
		navBarBlur: false,
		navBarBackgroundColor: Platform.OS === 'ios' ? 'transparent' : '#FAFAFA',
		navBarTranslucent: Platform.OS === 'ios' ? true : false,
		navBarTransparent: Platform.OS === 'ios' ? true : false,
		statusBarColor: '#FAFAFA',
		hideBackButtonTitle: true,
		topBarElevationShadowEnabled: false,
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
