import React, { Component } from 'react'

class RankingApp extends Component {
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

    componentDidMount(){
        console.log('componentDidMount');
		fetch('/sendaboxranking"',{
			method: 'get',
			dataType: 'json',
			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then((response) => response.json())
		.then((responseData) => {
            console.log(responseData);
			//this.setState({mans: responseData});
		})
		.catch((error)=>{
			console.log('Error fetching man',error);
		});
    }
    
    render() {
        return (
            <div className="RankingApp">
                 <h1>Ranking Part Test</h1>
                <p>되냐고요</p>
            </div>

        );

    }
}


export default RankingApp