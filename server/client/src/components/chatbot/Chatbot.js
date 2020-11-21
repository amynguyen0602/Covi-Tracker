import React, { Component } from 'react';
import _ from 'lodash';
import { send_bot_event, send_bot_text } from '../../redux/actions/chatbotActions'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import { v4 as uuid } from 'uuid'
import { Button, Card, Input } from 'antd';
import { HeartFilled, SendOutlined } from '@ant-design/icons'
import Message from './Message'
import styles from '../../styles/styles'
import QuickReplies from './QuickReplies';
import { Link } from 'react-router-dom';

const { Search } = Input

const cookies = new Cookies()

const symptoms_payload = ["diarrhea_yes", "fever_breathe_yes", "symptom_fever", "symptom_breathe", "cough_sore_yes", "symptom_dry_cough", "symptom_sore_throat"]

export class Chatbot extends Component {
	messageEnd;
	constructor() {
		super()
		this.state = {
			messages: [],
			userInput: '',
			symptoms: [],
			currentReply:''
		};
		if (cookies.get('userID') === undefined)
			cookies.set('userID', uuid(), { path: '/' })
	}

	async bot_text(text) {
		if(isNaN(text)) {
			var says = {
				speaks: 'user',
				msg: {
					text: {
						text: text,
					},
				},
			}
		} else {
			var says = {
				speaks: 'user',
				msg: {
					text: {
						text: this.state.currentReply,
					},
				},
			}
		}
		
		this.setState({ messages: [...this.state.messages, says] })
		const userID = cookies.get('userID')
		await this.props.send_bot_text({ text, userID })

		_.forEach(this.props.bot_response.fulfillmentMessages, (msg) => {
			says = {
				speaks: 'bot',
				msg: msg,
			}
			this.setState({ messages: [...this.state.messages, says] })
		})
	}

	async bot_event(event) {
		const userID = cookies.get('userID')
		await this.props.send_bot_event({ event, userID })

		_.forEach(this.props.bot_response.fulfillmentMessages, (msg) => {
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

	handleReplyClick = (e, payload, text) => {
		e.preventDefault()
		e.stopPropagation()
		if(payload.stringValue === "diarrhea_yes" || payload.stringValue === "diarrhea_no") {
			if(symptoms_payload.includes(payload.stringValue)) {
				this.setState({ currentReply: text.stringValue, symptoms: [...this.state.symptoms, payload.stringValue] }, () => {
					this.bot_text(this.state.symptoms.length)
					this.setState({symptoms: []})
				})
			} else {
				this.setState({ currentReply: text.stringValue }, () => {
					this.bot_text(this.state.symptoms.length)
					this.setState({symptoms: []})
				})
			}
		}
		else {
			if(symptoms_payload.includes(payload.stringValue)) {
				this.setState({symptoms: [...this.state.symptoms, payload.stringValue]})
			}
			this.bot_text(text.stringValue)
		}
	}

	renderMessages = (stateMessages) => {
		if (stateMessages) {
			return _.map(stateMessages, (message, i) => {
				if(message.msg && message.msg.text && message.msg.text.text) {
					return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
				} else if(message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.quick_replies) {
					return <QuickReplies key = {i} fields = {message.msg.payload.fields} speaks={message.speaks}
							replyClick = {this.handleReplyClick} />
				} else if(message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.link) {
					return <div key={i}>
						<Message speaks={message.speaks} text={message.msg.payload.fields.text.stringValue} />
						<Button className = "map" type="primary" shape="round"><Link style={{paddingBottom: '5px'}} to={message.msg.payload.fields.link.structValue.fields.link.stringValue}>{message.msg.payload.fields.link.structValue.fields.text.stringValue}</Link>
						</Button>
					</div>
				} 
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

	handleMenuClick = () => {
		this.bot_text("Menu")
	}

	render() {
		return (
			<React.Fragment>
				<Card title={<div>
							<img alt="" src="/logo-light.jpg" style={{ width: '60px' }} />
							<span style={styles.chatBoxTitle}>Assistant</span>
						</div>}
					extra={<HeartFilled style={styles.icon} />}
					style={styles.chatBox}
					actions={[<Search style={{width: "260px", maxWidth: "150%"}}
							allowClear
							placeholder="Leave your message..."
							onSearch={(value) => this.handleSend(value)}
							enterButton={<SendOutlined />}
							value={this.state.userInput}
							onChange={this.onChangeInput}/>, <Button style={{float: "right"}} shape="round" type="primary" onClick={this.handleMenuClick}>Menu</Button>]}>
					<div style={styles.chatDiv} className = "chatbot">
						{this.renderMessages(this.state.messages)}
						<div ref={(el) => {this.messageEnd = el}}
						/>
					</div>
					
				</Card>
			</React.Fragment>
		);
	}
}

function mapStateToProps({ chatbot: {bot_response} } ) {
    return {
		bot_response
    }
}

export default connect(mapStateToProps, { send_bot_event, send_bot_text}) (Chatbot)
