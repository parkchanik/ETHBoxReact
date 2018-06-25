import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'

import angeltoken_artifacts from '../build/contracts/AngelToken.json'
import sendabox_artifacts from '../build/contracts/SendABox.json'
var AngelToken;
var SendABox;
var accounts;
var account;
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      BoxMessageValue: '',
      BoxETHValue: 0
    }

    
    //함수를 바인드 해줘야 this 를 쓸수있다?
    this.onSendABox = this.onSendABox.bind(this);
    this.BoxMessageInput = this.BoxMessageInput.bind(this);
    this.BoxETHInput = this.BoxETHInput.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)
    
    AngelToken = contract(angeltoken_artifacts);
    SendABox = contract(sendabox_artifacts);
    AngelToken.setProvider(this.state.web3.currentProvider);
    SendABox.setProvider(this.state.web3.currentProvider);

    var token;
    this.state.web3.eth.getAccounts((error, accounts) => {
        AngelToken.deployed().then(function(instance) {
          token = instance;
          //return token.getBalance.call(account, {from: account});
          console.log(account);
          return token.balanceOf(accounts[0]);
        }).then((value) => {
          //var balance_element = document.getElementById("balance");
          //balance_element.innerHTML = value.valueOf();
          console.log(value.valueOf());
          
          return  this.setState({ storageValue: value.valueOf() });
        }).catch(function(e) {
          console.log(e);
          //self.setStatus("Error getting balance; see log.");
        });
    });

    //return this.setState({ storageValue: 111 })
    // Declaring this for later so we can chain functions on SimpleStorage.
    /*
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
    */
  }
  onSendABox () {
  
    var boxeth = parseFloat(this.state.BoxETHValue);
    var boxmessage = this.state.BoxMessageValue;

    console.log(boxeth);
    console.log(boxmessage);

    var sendabox;
    this.state.web3.eth.getAccounts((error, accounts) => {
        SendABox.deployed().then((instance) => {
          sendabox = instance;
          return sendabox.giveABoxForMessage.sendTransaction(boxmessage, {from:accounts[0] , value:this.state.web3.toWei(boxeth , "ether") , gas: 2100000});

        }).then((result) => {
          alert('success');
          //self.setStatus("Transaction complete!");
          //self.refreshBalance();
        }).catch((e) => {
          console.log(e);
          //alert('fail');
          //self.setStatus("Error sending box; see log.");
          //self.setStatus(e);
        });
    });

  }

  BoxMessageInput(event) {
    console.log(event.target.value);
    this.setState ({
      BoxMessageValue: event.target.value
    });
  }

  BoxETHInput(event) {
    console.log(event.target.value);
    this.setState ({
      BoxETHValue: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <h4>Balance</h4>
              <strong>Balance</strong>: <span id="TTBalance"></span> {this.state.storageValue} TT<br/><br/>
              <h4>Send</h4>
              
              <input type="text" value={this.state.BoxMessageValue} onChange={this.BoxMessageInput} placeholder="BoxMessage"/>
              <input type="text" value={this.state.BoxETHValue} onChange={this.BoxETHInput} id="SendABoxETH" placeholder="BoxETH" />
              
              <button id="SendABoxButton" onClick={this.onSendABox}>SendBox</button>
              
         
      </div>
     
    );
  }
}

export default App
