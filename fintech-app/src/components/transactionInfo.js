'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

class transactionInfo extends Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	accounts: [],
	  	alltransactions: [],
	  	isLoading: false,
	  };
	}

  render() {
    return (
      <View style=>

      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex:1
	}
});


export default transactionInfo;