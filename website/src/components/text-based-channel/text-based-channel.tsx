import * as React from 'react';
import { fetchMessages } from '../redux/actions/message-actions';
import store from '../redux/store';
import Message from './message';
import MessageBox from './message-box';
import './text-based-channel.scoped.css';

export interface TextBasedChannelProps {
  channel: Entity.Channel;
}
 
const TextBasedChannel: React.FunctionComponent<TextBasedChannelProps> = (props) => {
  const state = store.getState();
  const messages = state.messages.get(props.channel.id) as Entity.Message[];
  const author = (m: Entity.Message) => state.users.find(u => u.id === m.authorId);
  
  return (
    <div className="text-based-channel flex flex-col flex-grow">
      <div className="messages">
        {messages.map(m => <Message
          key={m.id}
          author={author(m) as Entity.User}
          message={m} />)}
      </div>
      <MessageBox />
    </div>
  );
}

export default TextBasedChannel;