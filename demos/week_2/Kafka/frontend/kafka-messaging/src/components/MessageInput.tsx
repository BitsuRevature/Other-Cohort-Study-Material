import React, { useState } from 'react'
import { sendMessage } from '../api/messageService';

function MessageInput() {
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        await sendMessage(message);
        setMessage("");
    }

  return (
    <div>
        <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Enter a message'
        />
        <button onClick={handleSubmit}>Send</button>
    </div>
  )
}

export default MessageInput