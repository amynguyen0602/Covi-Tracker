import React, { useState } from 'react'
import { useEffect } from 'react'
import Message from './Message'
import { Button } from 'antd';

function QuickReplies({ fields, speaks, replyClick }) {
    const [actions, setActions] = useState([])

    useEffect(() => {
        setActions(fields.quick_replies.listValue.values)
    }, [fields])

    const clickReply = (e, {payload, text}) => {
        replyClick(e, payload, text)
    }
    return (
        <div>
			{fields.text && fields.text.stringValue && <Message speaks={speaks} text={fields.text.stringValue} />}
			{actions.map(action => <Button type="secondary" shape="round" style={{ margin: '5px'}}
				key = {action.structValue.fields.payload.stringValue} onClick={(e) => clickReply(e, action.structValue.fields)}>
				{action.structValue.fields.text.stringValue}
			</Button>
		    )}
		</div>
    )
}

export default QuickReplies
