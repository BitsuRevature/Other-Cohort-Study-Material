import React from 'react';
import logo from './logo.svg';
import './App.css';
import MessageInput from './components/MessageInput';
import MessageList from './components/MessageList';
import EventForm from './components/EventForm';
import EventTable from './components/EventTable';

function App() {
  return (
    <div className="App">
      {/* <h1>Kafka messaging System</h1>
      <MessageInput/>
      <MessageList/> */}
      <EventForm/>
      <EventTable/>
    </div>
  );
}

export default App;
