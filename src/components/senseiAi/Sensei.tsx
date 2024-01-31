import React, { useEffect, useState } from 'react';
import "./Sensei.css";
import axios from 'axios';

interface Message {
  content: string;
  userType: 'user' | 'assistant'; // Define the userType as either 'user' or 'sensei'
}

function Sensei() {
  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && chatText.trim() !== '') {

      const newMessage: Message = {
        content: chatText,
        userType: 'user',
      };

      setMessages([...messages, newMessage]);
      setChatText('');
    }
  };


  useEffect(() => {
    const chatbox = document.querySelector('.nihongo-sensei-aibot-chatbox-container');
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    if(messages.length === 0){
      return;
    }

    //get the last message if there is one
    const lastMessage = messages[messages.length - 1];

    if(lastMessage.userType === 'assistant'){
      return;
    }

    // const dummyMessage: Message = {
    //   content: 'dummy',
    //   userType: 'assistant',
    // };

    // const newMessages: Message[] = [...messages, dummyMessage];

    //for each message replace space with %20
    // for(let i = 0; i < newMessages.length; i++){
    //   newMessages[i].content = newMessages[i].content.replaceAll('.', '\n');
    // }

    // setMessages([...newMessages]);

    console.log(lastMessage);

    axios.get('http://localhost:3002/query', {
      params: {
        query: lastMessage.content
      }
    })
      .then((response) => {

        const newMessages: Message[] = [];

        console.log(response.data.data);
        for(let i = 0; i < response.data.data.length; i++){
            const message = {
              content: response.data.data[i].content[0].text.value,
              userType: response.data.data[i].role,
            };
            newMessages.push(message);
          }
        
        //reverse the array so that the messages are in the correct order
        newMessages.reverse();
        setMessages([...newMessages]);
      })
      .catch((error) => {
        console.error(error);
      });

}, [messages]);



return (
  <div className="nihongo-sensei-aibot-container">
    <div className='nihongo-sensei-aibot-chatbox-container'>
        {messages.map((message, index) => (
          <div key={index} className={`nihongo-sensei-aibot-chatbox-${message.userType}`}>
            <span className='npmnihongo-sensei-aibot-message' style={{ whiteSpace: 'pre-line' }}>{message.content}</span>
          </div>
        ))}
    </div>
    <div className="nihongo-sensei-aibot-text-wrapper">
      <input
        type="text"
        className="nihongo-sensei-aibot-input"
        value={chatText}
        onChange={(e) => setChatText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  </div>
);


}

export default Sensei;
