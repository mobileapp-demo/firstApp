/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  SegmentedControlIOS,
  Image,
  ScrollView,
  Dimensions,
  RefreshControl
} from 'react-native';

var width = Dimensions.get('window').width;

export default class firstApp extends Component {

  getMovies(that) {
    return fetch('http://bbfat.oicp.io/api/dytt.json', {'User-Agent': 'curl/7.38.0'})
      .then((response) => response.json())
      .then((responseJson) => {console.log(responseJson.data); that.setState({movies: responseJson.data})})
      .catch((error) => {console.log(error)})
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      movies: [
      ]
    };

    this.getMovies(this);
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.getMovies(this);
    this.setState({refreshing: false});
  }

  render() {
    var movieList = this.state.movies.map(function(movie, index) {
      return (
        <View key={index} style={styles.movieitems}>
            <Image
              style={styles.itemleft}
              resizeMode='stretch'
              source={{uri: movie.cover}}
            />
            <View style={styles.itemright}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.righttext}>片名：{movie.title}</Text>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.righttext}>类别：{movie.catalog}</Text>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.righttext}>国家：{movie.country}</Text>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.righttext}>年代：{movie.time}</Text>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.righttext}>语言：{movie.lang}</Text>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.righttext}>导演：{movie.director}</Text>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.righttext}>主演：{movie.star}</Text>
              <Text ellipsizeMode="tail" numberOfLines={7} style={styles.rightsmall}>{movie.brief}</Text>
            </View>
          </View>
      )
    })

    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.welcome}>
          电影天堂最新电影
        </Text>
        </View>
        <ScrollView style={{flex: 1, width: width}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
        }>
          {movieList}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 15
  },
  header: {
    width: width,
    height: 30,
    margin: 5,
    backgroundColor: '#00a2ea'
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 5,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  movieitems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  itemleft: {
    flex: 0.4,
    height: 200,
    margin: 10
  },
  itemright: {
    flex: 0.6,
    margin: 10,
    justifyContent: 'flex-start'
  },
  righttext: {
    marginBottom: 2
  },
  rightsmall: {
    fontSize: 10
  }
});

AppRegistry.registerComponent('firstApp', () => firstApp);
