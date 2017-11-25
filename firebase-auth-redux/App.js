import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: "AIzaSyCteGgArCcJuPfQXfWTAfdQ57vDaqzM5sc",
      authDomain: "one-time-password-6d0f9.firebaseapp.com",
      databaseURL: "https://one-time-password-6d0f9.firebaseio.com",
      projectId: "one-time-password-6d0f9",
      storageBucket: "one-time-password-6d0f9.appspot.com",
      messagingSenderId: "298856870067"
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <View style={styles.container}>
          <SignUpForm />
          <View style={styles.separator} ></View>
          <SignInForm />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  separator: {
    height: 3,
    width: 200,
    backgroundColor: 'steelblue'
  }
});
