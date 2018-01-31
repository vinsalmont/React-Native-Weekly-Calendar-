'use-strict'
import React from 'react'
import {
	StyleSheet,
	View,
	Text,
} from 'react-native'

import { Weekly } from '@weekly/Weekly'

import Utils from '@weekly/global/Utils'

import moment from 'moment'

const styles: any = StyleSheet.create({
	cardContainer: {
		paddingVertical: 10,
		borderBottomWidth: 0.5,
		borderColor: '#cecece',
		alignContent: 'center',
		justifyContent: 'center',
	},
	name: {
		fontSize: 14,
		fontWeight: 'bold',
	},
	description: {
		fontSize: 12,
		marginTop: 4,
		color: '#bbbbbb',
	},
	time: {
		fontSize: 12,
		marginTop: 4,
		color: '#bbbbbb',
	},
	lateTime: {
		fontSize: 12,
		marginTop: 4,
		color: 'red',
	},
})

interface Props {
	event: Weekly.Event
}

export default class EventCell extends React.Component<Props> {

	constructor(props) {
		super(props)
	}

	isSameDay() {
		const currentDate = Utils.formatDate(new Date())
		return currentDate === this.props.event.date ? true : false
	}

	isLate() {
		const currentTime = moment(new Date(), Utils.timeFormat())
		const eventTime = moment(this.props.event.time, Utils.timeFormat())
		return eventTime.isBefore(currentTime)
	}

	renderTime() {
		if (this.isSameDay() && this.isLate()) {
			return (
				<View>
					<Text style={styles.lateTime}>
						{this.props.event.time}
					</Text>
				</View>
			)
		} else {
			return (
				<View>
					<Text style={styles.time}>
						{this.props.event.time}
					</Text>
				</View>
			)
		}

	}

	render() {
		return (
			<View style={styles.cardContainer}>
				<Text style={styles.name}>
					{this.props.event.name}
				</Text>
				<Text
					numberOfLines={1}
					style={styles.description}>
					{this.props.event.description}
				</Text>
				{this.renderTime()}
			</View>
		)
	}

}
