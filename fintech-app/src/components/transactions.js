import React, { Component } from 'react';
import FilteredMultiSelect from 'react-filtered-multiselect';
import '../transaction.css';

const API = 'http://demo7235469.mockable.io/transactions';


class transactions extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	accounts: [],
	  	transactionsList: [],
	  	categories: [],
	  	isLoading: false,
	  	searchCriteria:{
	  		account:'NO FILTER',
	  		categories:[],
	  		sort:3
	  	}
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
				categories: data.categories,
				isLoading: false, 
			})
		});
	}


	filterTrasnactionByAccount(value){
		if(value == "NO FILTER"){
			return allTrasnactions
		}else{
				var accountId = this.state.accounts.filter((account)=>{
								return account.accountName == value;
							})[0].accountId;
		
				var filteredTrasnactions = allTrasnactions.filter((trasnaction)=>{
					return trasnaction.accountId == accountId; 
				});
				return filteredTrasnactions;
			}
	}

	search(){
		var accountsFilteredTrasnactions = this.filterTrasnactionByAccount(this.state.searchCriteria.account);
		var result = [];
		if(this.state.searchCriteria.categories.length == 0){
			result = accountsFilteredTrasnactions;
		}else{
			var result = accountsFilteredTrasnactions.filter((trasnaction)=>{
				return this.state.searchCriteria.categories.includes(trasnaction.category);
			})
		}


//Sort
  		if(this.state.searchCriteria.sort==1){ //recent to oldest
			result = result.sort(function(a,b){
			var c = new Date(a.transactionDate);
			var d = new Date(b.transactionDate);
			return c-d;
			});
			this.setState({transactionsList:result});
  		}else if(this.state.searchCriteria.sort==2){ //oldest to recent
			result = result.sort(function(a,b){
			var c = new Date(a.transactionDate);
			var d = new Date(b.transactionDate);
			return d-c;
			});
			this.setState({transactionsList:result});
  		}else if(this.state.searchCriteria.sort==3){ //unsorted
  			this.setState({transactionsList:result});
  		}
	
	}

	setSearchCriteriaAccount(value){
		var searchCriteria= this.state.searchCriteria;
		searchCriteria.account = value;
		this.setState({searchCriteria});
	}

	setCateogries(options){

		/*code taken from: https://stackoverflow.com/questions/28624763/retrieving-value-from-select-with-multiple-option-in-react*/
		  var value = [];
		  for (var i = 0, l = options.length; i < l; i++) {
		    if (options[i].selected) {
		    	if(options[i].value == ""){
		    		value=[];
		    		break
		    	}else{
		    		value.push(options[i].value);
		    	}
		      
		    }
		  }
			var searchCriteria= this.state.searchCriteria;
			searchCriteria.categories = value;
			this.setState({searchCriteria});
	}

	setSort(value){
		var searchCriteria= this.state.searchCriteria;

		if(value == "Unsorted"){
			searchCriteria.sort = 3;
		}else if(value == "NewestToOldest"){
			searchCriteria.sort = 2;
		}else if(value == "OldestToNewest"){
			searchCriteria.sort = 1;
		}
		this.setState({searchCriteria});
	}


  handleInputChange(event) {
    const target = event.target;
	const value = event.target.id === 'category' ? event.target.options: event.target.value;
    if(event.target.id === 'category' ){
    	this.setCateogries(event.target.options);
    }else if(event.target.id === 'sort'){
    	this.setSort(event.target.value);
    }else{
    	this.setSearchCriteriaAccount(event.target.value);
    }


    this.search();
    
  }
  getBalance(){
  	var totalBalance = 0;
  	var value = this.state.searchCriteria.account;
  	if(value == "NO FILTER"){
  		//for(var i = 0; i<this.state.accounts.length;i++){
  			totalBalance = "Select one of the accounts to see your current balance"
  		//}
  	}else{
		totalBalance = "$" + this.state.accounts.filter((account)=>{
						return account.accountName == value;
					})[0].balance;
	}
	
  	return (<label> {totalBalance}</label>);
  }
  reset(){
  	var searchCriteria= this.state.searchCriteria;
  	searchCriteria.account = 'NO FILTER';
	searchCriteria.categories =[];
	searchCriteria.sort = 3;
  	this.setState({searchCriteria});
  	this.search();
  	document.getElementById("form").reset();
  }

  render() {
  	const { accounts, isLoading,transactionsList, categories } = this.state;
    return (
      <div>
	      <form id="form">
				<div className="filters">
				<div>
				<div>
				<label> Filter transactions by category: </label>
				
					<select id="category" multiple onChange={(event)=>{this.handleInputChange(event)}}>
					<option></option>
			    	  {categories.map((category)=>{
				      	return (<option value={category}>{category}</option>);
			    	  })}					  
					</select>
					</div>
				</div>
				<div>
				<label> Filter transactions by account: </label>
			      <select onChange={(event)=>{this.handleInputChange(event)}}>
				      <option value="NO FILTER">NO FILTER</option>
			    	  {accounts.map((account)=>{
				      	return (<option value={account.accountName}>{account.accountName}</option>);
			    	  })}
				</select>
				</div>
				<div>
				<label> Sort transactions: </label>
			      <select id="sort" onChange={(event)=>{this.handleInputChange(event)}}>
				      <option value="Unsorted">Unsorted</option>
			    	  <option value="NewestToOldest">Newest to oldest</option>
			    	  <option value="OldestToNewest">Oldest to newest</option>
				</select>
				</div>
				<div>
				<label> Reset all the filters: </label>			
			<button type="button" onClick={()=>{this.reset() }}>Reset</button>
			</div>
			</div>
			</form> 
			<div className="CurrentBalance"><label><b>Current balance:</b>{this.getBalance()}</label></div>

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
