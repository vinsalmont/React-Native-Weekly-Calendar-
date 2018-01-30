import React from 'react'
import {
	View,
	StyleSheet,
} from 'react-native'
import CalendarStrip from 'react-native-calendar-strip'

import { connect } from 'react-redux'

import { Weekly } from '@weekly/Weekly'

function mapStateToProps(state: Weekly.State, props) {
	return {
		...props,
		...state,
	}
}

interface Props {
	navigator: any
	dispatch(action): Promise<void>
}

@connect(mapStateToProps)
class Home extends React.Component<Props> {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<CalendarStrip
					calendarAnimation={{ type: 'sequence', duration: 30 }}
					daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#9265DC' }}
					style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
					calendarHeaderStyle={{ color: 'white' }}
					calendarColor={'#7743CE'}
					dateNumberStyle={{ color: 'white' }}
					dateNameStyle={{ color: 'white' }}
					// iconLeft={require('./img/left-arrow.png')}
					// iconRight={require('./img/right-arrow.png')}
					iconContainer={{ flex: 0.1 }}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'red',
	},
})

export default Home
