import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

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
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
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
});
