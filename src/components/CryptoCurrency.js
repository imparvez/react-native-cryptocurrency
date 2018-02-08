import React from 'react';
import {   
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator,
  ListView,
  Image } from 'react-native';

const API = 'https://api.coinmarketcap.com/v1/ticker/';

export default class CryptoCurrency extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount(){
    return fetch(API)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator 
            color = '#bc2b78'
            size = "large"
            style = {styles.activityIndicator}
          />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <View style={{ padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#ccc' }}>
            {/*console.log(`https://s3-us-west-2.amazonaws.com/s.cdpn.io/1468070/${rowData.symbol.toLowerCase()}.svg`)*/}
            <Text style={styles.ranking}>Ranking: {rowData.rank}</Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{rowData.name}</Text>
            <Text style={{fontSize: 24, fontWeight: 'bold'}}>${rowData.price_usd} {((rowData.percent_change_24h) < 1) ? <Text style={{color: 'red', fontWeight: 'normal', fontSize: 16}}>{rowData.percent_change_24h}</Text> : <Text style={{color: 'green', fontWeight: 'normal', fontSize: 16}}>{rowData.percent_change_24h}</Text>}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Market Cap:</Text> ${rowData.market_cap_usd}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Volume:</Text> ${rowData['24h_volume_usd']}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Circulating Supply:</Text> {rowData.total_supply}</Text>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
  },
  ranking: {
    textAlign: 'center',
    height: 25
  }
});
