import React from 'react'
import './ReactotronConfig'

import { Store } from 'redux'
import { Provider } from 'react-redux'

import { Navigation } from 'react-native-navigation'

import { Weekly } from '@weekly/Weekly'

import { registerScreens } from '@weekly/screens'
import initialState from '@weekly/reducers/InitialState'
import { configureStore } from '@weekly/store/ConfigureStore'

export const weeklyStore = configureStore(initialState)
registerScreens(weeklyStore, Provider)

interface Props {
	store: Store<Weekly.State>
	navigator: any
}

class App extends React.Component<Props> {
	constructor(props) {
		super(props)
		this.startApp()
	}


	startApp() {
		Navigation.startSingleScreenApp({
			screen: {
				screen: 'calendar.Home',
				navigatorButtons: {},
			},
			appStyle: {
				statusBarColor: '#FAFAFA',
				statusBarTextColorScheme: 'light',
				navBarTextColor: 'white',
				navBarButtonColor: 'white',
				topBarElevationShadowEnabled: false,
				borderBottomColor: 'transparent',
				navBarNoBorder: true,
				screenBackgroundColor: 'white',
				hideBackButtonTitle: true,
				drawUnderNavBar: true,
				navBarTranslucent: true,
				navBarTransparent: true,
			},
			passProps: {},
			animationType: 'slide-down',
		})
	}
}

export default App
