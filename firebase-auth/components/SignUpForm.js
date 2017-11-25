import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const BASE_URL = 'https://us-central1-one-time-password-6d0f9.cloudfunctions.net';

class SignUpForm extends Component {
    state = { phone: '' };

    handleSubmit = async () => {
        const { phone } = this.state;
        try {
            await axios.post(`${BASE_URL}/createUser`, { phone });
            await axios.post(`${BASE_URL}/requestOneTimePassword`, { phone });
        } catch (err) {
            console.error(err);
        }

    }

    render() {
        return (
            <View>
                <View style={{ marginBottom: 10}}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput 
                        value={this.state.phone}
                        keyboardType='phone-pad'
                        onChangeText={phone => this.setState({ phone })}
                    />
                </View>
                <Button 
                    onPress={this.handleSubmit}
                    title="Submit" />
            </View>
        );
    }
}

export default SignUpForm;