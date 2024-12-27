import React, { useEffect, useState } from 'react'
import { fetchMessages } from '../api/messageService';

function MessageList() {
    const [messages, setMessages] = useState<string[]>([]);

    // useEffect(() => {
    //     const getMessages = async () => {
    //         const data = await fetchMessages();
    //         setMessages(data);
    //     }
        
    //     getMessages();
    // }, [])

  return (
    <div>
        <h3>Consumed Messages:</h3>
        <ul>
            {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
            ))}
        </ul>
    </div>
  )
}

export default MessageList