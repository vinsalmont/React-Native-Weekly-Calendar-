'use strict'
import React from 'react'
import {
	StyleSheet,
	View,
	Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles: any = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	description: {
		textAlign: 'center',
		color: '#5E738A',
		fontSize: 20,
	},
	icon: {
		height: 25,
		width: 25,
		marginLeft: 10,
	},
})

export default class EmptySection extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.description}>
					No events
				</Text>
				<Icon
					name='calendar'
					size={25}
					color='#5E738A'
					style={styles.icon}
				/>
			</View>
		)
	}
}
