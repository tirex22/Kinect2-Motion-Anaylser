import React from 'react';
import { StyleSheet, Text, View, StatusBar, webView } from 'react-native';
import Router from './components/Router'

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, }}>
        <StatusBar barStyle="dark-content" />
        <Router />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
