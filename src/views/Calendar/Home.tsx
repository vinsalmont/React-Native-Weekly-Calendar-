import React from 'react'
import {
	View,
	StyleSheet,
	ListView,
} from 'react-native'

import { connect } from 'react-redux'

import { Weekly } from '@weekly/Weekly'

import { Synced } from '@weekly/store/Sync'
import EmptySection from '@weekly/global/Components/EmptySection'

import ActionButton from 'react-native-action-button'
import CalendarStrip from 'react-native-calendar-strip'
import Icon from 'react-native-vector-icons/Ionicons'
import { ifIphoneX } from 'react-native-iphone-x-helper'
interface Props {
	navigator: any
	currentDayEvents: Synced<Weekly.Event[]>
	dispatch(action): Promise<void>
}

interface State {
	loading: boolean
	refreshing: boolean
	dataSource?: any
}

const ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2,
})

function mapStateToProps(state: Weekly.State, props) {
	return {
		...props,
		currentDayEvents: state.currentDayEvents,
	}
}

@connect(mapStateToProps)
class Home extends React.Component<Props, State> {

	constructor(props) {
		super(props)

		this.state = {
			refreshing: false,
			loading: false,
			dataSource: ds.cloneWithRows([]),
		}
	}

	componentDidMount() {
		//
	}

	componentWillReceiveProps(_nextProps) {
		//
	}

	loadData() {
		this.setState({ loading: true })
		// dispatch
	}

	onRefresh() {
		this.setState({ refreshing: true })
		this.loadData()
	}

	renderRow(_bject) {
		// const _event = object as Weekly.Event
		return (
			// <Card
			// 	user={user}
			// 	product={product}
			// 	showDetails={(prod) => this.showDetails(prod)}
			// />
			<View></View>
		)
	}

	renderList(hasData) {
		if (hasData) {
			return (
				<ListView
					enableEmptySections
					style={styles.list}
					dataSource={this.state.dataSource}
					renderRow={(data) => this.renderRow(data)}
					removeClippedSubviews={true}
				// refreshControl={
				// 	<RefreshControl
				// 		refreshing={this.state.refreshing}
				// 		onRefresh={this.onRefresh.bind(this)}
				// 	/>
				// }
				/>
			)
		} else {
			return (
				<EmptySection />
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<CalendarStrip
					calendarAnimation={calendarAnimation}
					daySelectionAnimation={daySelectionAnimation}
					style={calendarStripStyles.calendar}
					calendarHeaderStyle={calendarStripStyles.header}
					calendarColor={'#fafafa'}
					dateNumberStyle={calendarStripStyles.dateNumber}
					dateNameStyle={calendarStripStyles.dateName}
					iconContainer={calendarStripStyles.iconContainer}
					numDaysInWeek={5}
					maxDayComponentSize={50}
				/>

				{this.renderList(this.state.dataSource.getRowCount() > 0)}

				<ActionButton buttonColor='rgba(231,76,60,1)'>
					<ActionButton.Item buttonColor='#1abc9c' title='New Event' onPress={() => { }}>
						<Icon name='md-create' style={styles.actionButtonIcon} />
					</ActionButton.Item>
				</ActionButton>
			</View>
		)
	}
}

const calendarAnimation = {
	type: 'parallel',
	duration: 30,
}

const daySelectionAnimation = {
	type: 'background',
	duration: 300,
	highlightColor: '#D0DAEA',
}

const calendarStripStyles = StyleSheet.create({
	calendar: {
		height: 120,
		paddingTop: 30,
	},
	header: {
		color: '#053D4E',
		fontSize: 16,
	},
	dateNumber: {
		color: '#053D4E',
	},
	dateName: {
		color: '#053D4E',
	},
	iconContainer: {
		flex: 0.1 ,
	},
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {
		flexGrow: 1,
		paddingTop: 10,
		paddingBottom: 20,
		paddingHorizontal: 10,
		...ifIphoneX({
			marginBottom: 84,
		}, {
				marginBottom: 50,
			}),
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	},
})

export default Home
