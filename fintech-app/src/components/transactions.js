import React, { Component } from 'react';
import '../transaction.css';

const API = 'http://demo7235469.mockable.io/transactions';


class transactions extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	accounts: [],
	  	transactionsList: [],
	  	isLoading: false,
	  };
	}
	componentWillMount(){
		this.setState({ isLoading: true });
		fetch(API)
		.then(response=> response.json())
		.then((data) => {
			allTrasnactions = data.transactionData.transactions;
			this.setState({
				accounts: data.accounts,
				transactionsList: data.transactionData.transactions,
				isLoading: false, 
			})
		});
	}


	filterTrasnactionByAccount(value){
		if(value == "NO FILTER"){
			this.setState({transactionsList:allTrasnactions});
		}else{
				var accountId = this.state.accounts.filter((account)=>{
								return account.accountName == value;
							})[0].accountId;
		
				var filteredTrasnactions = allTrasnactions.filter((trasnaction)=>{
					return trasnaction.accountId == accountId; 
				});
				this.setState({transactionsList:filteredTrasnactions});
			}
	}
  render() {
  	const { accounts, isLoading,transactionsList } = this.state;
  	if(isLoading) {
  		return <p>Loading...</p>;
  	}
    return (
      <div>

      <select onChange={(event)=>{this.filterTrasnactionByAccount(event.target.value)}}>
      <option value="NO FILTER">NO FILTER</option>
      {accounts.map((account)=>{
      	return (<option value={account.accountName}>{account.accountName}</option>);
      })}
	</select>

    	<table>
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
    		{transactionsList.map((trasnaction) => {
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
let allTrasnactions = null;
export default transactions;
