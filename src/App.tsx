import React from 'react'
import './ReactotronConfig'

import { Store } from 'redux'
import { Provider } from 'react-redux'

import { Navigation } from 'react-native-navigation'

import { Weekly } from '@weekly/Weekly'

import { registerScreens } from '@weekly/screens'
import initialState from '@weekly/reducers/InitialState'
import { configureStore } from '@weekly/store/ConfigureStore'
import { Platform } from 'react-native';

export const weeklyStore = configureStore(initialState)
registerScreens(weeklyStore, Provider)

interface Props {
	store: Store<Weekly.State>
	navigator: any
}

class App extends React.Component<Props> {
	constructor(props) {
		super(props)
		console.disableYellowBox = true
		this.startApp()
	}


	startApp() {
		Navigation.startSingleScreenApp({
			screen: {
				screen: 'calendar.Home',
				navigatorButtons: {},
			},
			appStyle: {
				navBarTextColor: 'white',
				navBarButtonColor: 'white',
				navBarNoBorder: true,
				drawUnderNavBar: true,
				navBarBlur: false,
				navBarBackgroundColor: Platform.OS === 'ios' ? 'transparent' : '#064783',
				navBarTranslucent: Platform.OS === 'ios' ? true : false,
				navBarTransparent: Platform.OS === 'ios' ? true : false,
				statusBarColor: '#FAFAFA',
				statusBarTextColorScheme: 'dark',
				hideBackButtonTitle: true,
				topBarElevationShadowEnabled: false,
			},
			passProps: {},
			animationType: 'slide-down',
		})
	}
}

export default App
