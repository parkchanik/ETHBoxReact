import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import RankingApp from './RankingApp'
import ChatApp from './ChatApp'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

ReactDOM.render(
  <RankingApp />,
  document.getElementById('RankingArea')
);

ReactDOM.render(
  <ChatApp />,
  document.getElementById('ChatArea')
);