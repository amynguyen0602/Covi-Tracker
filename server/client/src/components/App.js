import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Chatbot from './chatbot/Chatbot'
import { MessageTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import styles from '../styles/styles'
import Landing from './pages/Landing'
import Map from './map/Map'
import SelfReport from './form/SelfReport'
import Navbar from './layout/Navbar'


function App() {
    const [ showChat, setShowChat ] = React.useState(false)

    const showchatIcon = () => {
        return !showChat ? <MessageTwoTone style={styles.chatIcon} onClick={() => setShowChat(true)}/> 
            : <CloseCircleTwoTone style={styles.chatIcon} onClick ={() => setShowChat(false)}/>
    }
    const showChatbot = () => {
        return showChat ? <Chatbot /> : null
    }
    return (
        <BrowserRouter>
            <React.Fragment>
                <Navbar />
                <div style={styles.body}>
                    <Route exact path ="/" component={Landing} />
                    <Route exact path="/map" component={Map} />
                    <Route path="/selfReport" component={SelfReport} />
                    {showchatIcon()}
                    {showChatbot()}
                </div>
            </React.Fragment>
        </BrowserRouter>
    )
}

export default App
