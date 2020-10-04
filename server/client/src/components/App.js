import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Chatbot from './chatbot/Chatbot';
import { MessageTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import styles from '../styles/styles';
import Dashboard from './pages/Dashboard';
import Map from './map/Map';
import SelfReport from './reportcase/SelfReport';
import Navbar from './layout/Navbar';

function App() {
	const [showChat, setShowChat] = React.useState(false);

	const showchatIcon = () => {
		return !showChat ? (
			<MessageTwoTone style={styles.chatIcon} onClick={() => setShowChat(true)} />
		) : (
			<CloseCircleTwoTone style={styles.chatIcon} onClick={() => setShowChat(false)} />
		);
	};
	const showChatbot = () => {
		return showChat ? <Chatbot /> : null;
	};
	return (
		<BrowserRouter>
			<React.Fragment>
				<div style={styles.body}>
					<Route exact path="/" component={Dashboard} />
					<Route path="/map" component={Map} />
					<Route path="/selfReport" component={SelfReport} />
					<Navbar />
					{showchatIcon()}
					{showChatbot()}
				</div>
			</React.Fragment>
		</BrowserRouter>
	);
}

export default App;
