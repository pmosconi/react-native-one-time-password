import React, { Component } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const BASE_URL = 'https://us-central1-one-time-password-6d0f9.cloudfunctions.net';

class SignInForm extends Component {
    state = { phone: '', code: '' };

    handleSubmit = async () => {
        const { phone, code } = this.state;
        try {
            const { data } = await axios.post(`${BASE_URL}/verifyOneTimePassword`, { phone, code });
            
            firebase.auth().signInWithCustomToken(data.token);
        } catch (err) {
            console.error(err);
        }

    }

    render() {
        return (
            <KeyboardAvoidingView 
                style={{ marginBottom: 10}}
                behavior="padding"
            >
            
                <FormLabel>Enter Phone Number</FormLabel>
                <FormInput 
                    value={this.state.phone}
                    keyboardType='phone-pad'
                    onChangeText={phone => this.setState({ phone })}
                />

                <FormLabel>Enter Code</FormLabel>
                <FormInput 
                    value={this.state.code}
                    keyboardType="phone-pad"
                    onChangeText={code => this.setState({ code })}
                />

                <Button 
                    onPress={this.handleSubmit}
                    title="Submit" />

            </KeyboardAvoidingView>
        );
    }
}

export default SignInForm;