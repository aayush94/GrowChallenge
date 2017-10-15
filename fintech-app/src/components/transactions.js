import React, { Component } from 'react';

const API = 'http://demo7235469.mockable.io/transactions';


class transactions extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	accounts: [],
	  	alltransactions: [],
	  	isLoading: false,
	  };
	}
	componentWillMount(){
		this.setState({ isLoading: true });
		fetch(API)
		.then(response=> response.json())
		.then(data => this.setState({
			accounts: data.accounts,
			alltransactions: data.transactionData.transactions,
			isLoading: false, 
		}));
	}
  render() {
  	const { accounts, alltransactions, isLoading } = this.state;
  	if(isLoading) {
  		return <p>Loading...</p>;
  	}
    return (
      <div className = "transactions">
    	<div>
 			{accounts.map(account => 
 			<li> {account.accountName} </li>
 		)}		
    	</div>
    	{alltransactions.map(transaction => 
    		<li> { transaction.description } </li>
    		)}
      </div>
    );
  }
}

export default transactions;
