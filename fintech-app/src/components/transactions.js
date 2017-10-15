import React, { Component } from 'react';
import '../transaction.css';

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
      <div>
    	<table >
    	  <tr>
		    <th>Account name</th>
		    <th>Account number</th>
		    <th>Transaction date</th>
		    <th>Amount</th>
			<th>Withdrawal</th>
			<th>Deposit</th>			
			<th>Running balance</th>
		    <th>Description</th>
  		</tr>
    		{alltransactions.map((trasnaction) => 
 			 {
 			 	// console.log("mapping account "+account);
 			 	var accountName = accounts.filter((account)=>{
				 				return account.accountId == trasnaction.accountId;
				 			})[0].accountName;
				return  (<tr>
				 			<td>{accountName}</td>
						    <td>{trasnaction.accountId}</td>
						    <td>{trasnaction.transactionDate}</td>
						    <td>{trasnaction.amount}</td>
							<td>{trasnaction.withdrawal}</td>
							<td>{trasnaction.deposit}</td>
							<td>{trasnaction.runningBalance}</td>
						    <td>{trasnaction.description}</td>
				  </tr>);
 			})}
 		</table>

      </div>
    );
  }
}
/*
    	{alltransactions.map(transaction =>
    		<li> { transaction.description } </li>
    		)}
*/
export default transactions;
