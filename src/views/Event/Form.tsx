import React from 'react'
import {
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
	Keyboard,
	Alert,
} from 'react-native'

import { connect } from 'react-redux'

import DatePicker from 'react-native-datepicker'
import Spinner from 'react-native-loading-spinner-overlay'

import { ifIphoneX } from 'react-native-iphone-x-helper'
import { TextField } from 'react-native-material-textfield'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Weekly } from '@weekly/Weekly'

import { Creation } from '@weekly/actions/Creation'

import Navigation from '@weekly/global/Navigation'
import Utils from '@weekly/global/Utils'

interface Props {
	navigator: any
	dispatch(action): Promise<void>
}

interface State {
	loading: boolean
	showDate: boolean
	id?: any
	name: any,
	description: string,
	date?: any,
	time: any,
}

function mapStateToProps(state: Weekly.State, props) {
	return {
		...props,
		state,
	}
}

@connect(mapStateToProps)
class Form extends React.Component<Props, State> {

	static navigatorStyle = {
		navBarTextColor: '#053D4E',
		navBarButtonColor: '#053D4E',
	}

	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			showDate: false,
			name: '',
			description: '',
			date: new Date(),
			time: Utils.formatTime(new Date()),
		}
	}

	changeName(name) {
		this.setState({ name })
	}

	changeDescription(description) {
		this.setState({ description })
	}

	validate() {
		return [
			this.state.name,
			this.state.description,
			this.state.date,
			this.state.time,
		].every(f => f !== '')
	}

	createObject() {
		return {
			name: this.state.name,
			description: this.state.description,
			date: Utils.formatDate(this.state.date),
			time: this.state.time,
		} as Weekly.Event
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				<View style={styles.navBarContainer} >
				</View>
				<KeyboardAwareScrollView
					keyboardShouldPersistTaps='never'
					style={styles.root}
					contentContainerStyle={{ justifyContent: 'center' }}
				>
					<TextField {...textFieldProps}
						label='Name:'
						labelFontSize={13}
						labelPadding={3}
						autoCorrect={false}
						autoCapitalize='none'
						value={this.state.name}
						onChangeText={this.changeName.bind(this)}
					/>

					<TextField {...textFieldProps}
						label='Description:'
						labelFontSize={13}
						labelPadding={3}
						autoCorrect={false}
						autoCapitalize='none'
						value={this.state.description}
						onChangeText={this.changeDescription.bind(this)}
					/>

					<View style={styles.dateContainer}>
						<Text style={styles.dateContainerTitle}>Event Date:</Text>
						<DatePicker
							style={{
								width: '100%',
								backgroundColor: 'transparent',
							}}
							date={this.state.date}
							mode='date'
							placeholder='Selecionar data'
							format={Utils.dateFormate()}
							confirmBtnText='Confirm'
							cancelBtnText='Cancel'
							showIcon={false}
							onDateChange={(date) => { this.setState({ date }) }}
							customStyles={{
								dateInput: {
									borderWidth: 0,
									borderBottomWidth: 1,
									borderColor: '#053D4E',
								},
								dateText: {
									color: '#053D4E',
								},
							}}
						/>
					</View>

					<View style={styles.dateContainer}>
						<Text style={styles.dateContainerTitle}>Event Time:</Text>
						<DatePicker
							style={{
								width: '100%',
								backgroundColor: 'transparent',
							}}
							date={this.state.time}
							mode='time'
							placeholder='Select the event time'
							format={Utils.timeFormat()}
							confirmBtnText='Confirm'
							cancelBtnText='Cancel'
							showIcon={false}
							onDateChange={(time) => { this.setState({ time }) }}
							customStyles={{
								dateInput: {
									borderWidth: 0,
									borderBottomWidth: 1,
									borderColor: '#053D4E',
								},
								dateText: {
									color: '#053D4E',
								},
								placeholderText: {
									color: '#053D4E',
								},
							}}
						/>
					</View>

					<TouchableHighlight
						underlayColor='#41C4EC'
						style={{
							height: 40,
							marginTop: 20,
							borderRadius: 4,
							borderColor: 'white',
							borderWidth: 2,
							backgroundColor: '#41C4EC',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						onPress={() => {
							Keyboard.dismiss()
							if (this.validate()) {
								this.setState({ loading: true })
								this.props.dispatch(Creation.createEvent({
									event: this.createObject(),
								})).then(() => {
									Alert.alert('Success', 'Event registered',
										[{
											text: 'OK', onPress: () => {
												this.setState({ loading: false })
												this.props.dispatch({ type: Creation.Type.RELOAD })
												Navigation.pop(this.props.navigator)
											},
										}],
										{ cancelable: false },
									)
								})
							} else {
								Alert.alert('Error', 'You must fill all the fields',
									[{
										text: 'OK',
									}],
									{ cancelable: false },
								)
							}
						}
						}>
						<Text style={{ color: 'white', fontSize: 14, fontWeight: '400' }}>
							Register
						</Text>
					</TouchableHighlight>
					<Spinner
						visible={this.state.loading}
						textStyle={{
							textShadowColor: '#333',
							textShadowOffset: { width: 0, height: 1 },
							color: '#fff',
						}}
						overlayColor='#000d'
						animation='fade'
						textContent={'Aguarde...'} />
				</KeyboardAwareScrollView>
			</View>
		)
	}
}

const textFieldProps: any = {
	tintColor: '#053D4E',
	textColor: '#053D4E',
	baseColor: '#053D4E',
}

const styles: any = StyleSheet.create({
	container: {
		flex: 1,
	},
	navBarContainer: {
		paddingTop: 4,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#fafafa',
		...ifIphoneX({
			height: 94,
		}, {
				height: 64,
			}),
	},

	root: {
		flex: 1,
		paddingHorizontal: 30,
		backgroundColor: 'white',
	},
	navImage: {
		flex: 1,
		marginTop: 20,
		alignSelf: 'center',
	},
	dateContainer: {
		marginTop: 30,
	},
	dateContainerTitle: {
		color: '#053D4E',
		fontSize: 13,
	},
})

export default Form

