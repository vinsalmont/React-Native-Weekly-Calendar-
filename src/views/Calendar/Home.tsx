import React from 'react'
import {
	View,
	StyleSheet,
	ListView,
	RefreshControl,
	Alert,
} from 'react-native'

import { connect } from 'react-redux'

import { Weekly } from '@weekly/Weekly'

import { Event } from '@weekly/actions/Event'

import { Synced, isSynced, shouldReload } from '@weekly/store/Sync'

import EmptySection from '@weekly/global/Components/EmptySection'
import EventCell from '@weekly/views/Calendar/EventCell'

import Navigation from '@weekly/global/Navigation'
import Utils from '@weekly/global/Utils'

import ActionButton from 'react-native-action-button'
import CalendarStrip from 'react-native-calendar-strip'
import Icon from 'react-native-vector-icons/Ionicons'
import Swipeout from 'react-native-swipeout'
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Creation } from '@weekly/actions/Creation'

interface Props {
	navigator: any
	currentDayEvents: Synced<Weekly.Event[]>
	creation: Synced<Weekly.Event>
	dispatch(action): Promise<void>
}

interface State {
	loading: boolean
	refreshing: boolean
	portrait: boolean
	dataSource?: any
	selectedDate: string
}

const ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2,
})

function mapStateToProps(state: Weekly.State, props) {
	return {
		...props,
		state,
		currentDayEvents: state.currentDayEvents,
		creation: state.creation,
	}
}

@connect(mapStateToProps)
class Home extends React.Component<Props, State> {

	constructor(props) {
		super(props)

		const currentDate = new Date()

		this.state = {
			refreshing: false,
			loading: false,
			portrait: true,
			dataSource: ds.cloneWithRows([]),
			selectedDate: Utils.formatDate(currentDate),
		}
	}

	componentDidMount() {
		const date = new Date()
		const formated = Utils.formatDate(date)
		this.loadData(formated)
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.currentDayEvents !== nextProps.currentDayEvents) {
			if (isSynced(nextProps.currentDayEvents)) {
				this.setState({
					dataSource: ds.cloneWithRows(nextProps.currentDayEvents),
				})
			}
		}

		if (this.props.creation !== nextProps.creation) {
			if (shouldReload(nextProps.creation)) {
				this.props.dispatch({ type: Creation.Type.NONE })
				this.onRefresh()
			}
		}
	}

	loadData(date) {
		this.setState({ loading: true })
		this.props.dispatch(Event.getDayEvents({
			date,
		})).then(() => {
			this.setState({ refreshing: false, loading: false })
		})
	}

	onRefresh() {
		this.setState({ refreshing: true })
		this.loadData(this.state.selectedDate)
	}

	selectDate(date) {
		const formatedDate = Utils.formatDate(date)
		this.setState({ selectedDate: formatedDate })
		this.loadData(formatedDate)
	}

	removeEvent(event) {
		Alert.alert('Warning', 'Do you really want to remove this event? This action cannot be undone.',
			[
				{
					text: 'No',
				},
				{
					text: 'Yes', onPress: () => {
						this.props.dispatch(Creation.remove({
							event,
						})).then((() => {
							this.props.dispatch({ type: Creation.Type.RELOAD })
						}).bind(this))
					},
				}],
			{ cancelable: false },
		)
	}

	renderRow(object) {
		const event = object as Weekly.Event

		const swipeBtns = [{
			text: 'Delete',
			backgroundColor: 'red',
			underlayColor: 'red',
			onPress: () => { this.removeEvent(event) },
		}]

		return (
			<Swipeout
				right={swipeBtns}
				backgroundColor='transparent'
				autoClose={true}
			>
				<EventCell
					event={event}
				/>
			</Swipeout>
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
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.onRefresh.bind(this)}
						/>
					}
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
					maxDayComponentSize={50}
					onDateSelected={(date) => this.selectDate(date)}
				/>

				{this.renderList(this.state.dataSource.getRowCount() > 0)}

				<ActionButton buttonColor='rgba(231,76,60,1)'>
					<ActionButton.Item buttonColor='#1abc9c' title='New Event' onPress={() => Navigation.push(this.props.navigator, 'event.Form', 'Create Event')} >
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
		flex: 0.1,
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
