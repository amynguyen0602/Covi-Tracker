import React, { Component } from 'react';
import _ from 'lodash';
import * as actions from '../../redux/actions'
import { connect } from 'react-redux'
import { Card, Input } from 'antd';
import { HeartFilled, SendOutlined } from '@ant-design/icons'
import Message from './Message'
import styles from '../../styles/styles'

const { Search } = Input

export class Chatbot extends Component {
	messageEnd;
	state = {
		messages: [],
		userInput: '',
	};

	async bot_text(text) {
		let says = {
			speaks: 'user',
			msg: {
				text: {
					text: text,
				},
			},
		}

		this.setState({ messages: [...this.state.messages, says] })
		await this.props.send_bot_text(text)

		_.forEach(this.props.chatbot.fulfillmentMessages, (msg) => {
			says = {
				speaks: 'bot',
				msg: msg,
			}
			this.setState({ messages: [...this.state.messages, says] })
		})
	}

	async bot_event(event) {
		await this.props.send_bot_event(event)

		_.forEach(this.props.chatbot.fulfillmentMessages, (msg) => {
			let says = {
				speaks: 'bot',
				msg: msg,
			}
			this.setState({ messages: [...this.state.messages, says] })
		})
	}

	componentDidMount() {
		this.bot_event('Welcome')
	}

	componentDidUpdate() {
		this.messageEnd.scrollIntoView({ behaviour: 'smooth' })
	}

	renderMessages = (stateMessages) => {
		if (stateMessages) {
			return _.map(stateMessages, (message, i) => {
				return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
			});
		} else {
			return null
		}
	};

	handleSend = (value) => {
		if (value) {
			this.bot_text(value)
			value = '';
		}
		this.setState({ userInput: '' })
	};

	onChangeInput = (e) => {
		this.setState({ userInput: e.target.value })
	};

	render() {
		return (
			<React.Fragment>
				<Card title={<div>
							<img alt="" src="/logo-light.jpg" style={{ width: '60px' }} />
							<span style={styles.chatBoxTitle}>Assistant</span>
						</div>}
					extra={<HeartFilled style={styles.icon} />}
					style={styles.chatBox}
					actions={[<Search
							style={styles.messageSend}
							allowClear
							placeholder="Leave your message..."
							onSearch={(value) => this.handleSend(value)}
							enterButton={<SendOutlined />}
							value={this.state.userInput}
							onChange={this.onChangeInput}/>,]}>
					<div style={styles.chatDiv}>
						{this.renderMessages(this.state.messages)}
						<div ref={(el) => {this.messageEnd = el}}
						/>
					</div>
				</Card>
			</React.Fragment>
		);
	}
}

function mapStateToProps({ chatbot } ) {
    return {
		chatbot
    }
}

export default connect(mapStateToProps, actions) (Chatbot)
