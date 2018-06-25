import React, { Component } from 'react'

class ChatApp extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        storageValue: 0,
        web3: null,
        BoxMessageValue: '',
        BoxETHValue: 0
      }

    }


    componentWillMount() {
        console.log('componentWillMount');

    }

    render() {
        return (
            <div className="ChatApp">
                 <h1>Chat Part Test</h1>
                <p>채팅 에리어</p>
            </div>

        );

    }
}


export default ChatApp