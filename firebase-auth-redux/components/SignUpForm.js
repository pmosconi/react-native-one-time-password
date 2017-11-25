import React, { Component } from 'react';
import { Alert, ToastAndroid, View, KeyboardAvoidingView, Text, StyleSheet, Platform } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import InProgress from './InProgress';
import { signupUser } from '../actions';

class SignUpForm extends Component {
    state = { phone: '' };

    handleSubmit = () => this.props.signupUser(this.state.phone);

    render() {
        if (this.props.isSignup)
            return <InProgress text="Sign Up"/>;

        if (this.props.isSignupError) {
            if (Platform.OS === 'android')
                ToastAndroid.showWithGravity(this.props.error, ToastAndroid.LONG, ToastAndroid.TOP);
            else
                Alert.alert(this.props.error);
        }
            
        return (
            <KeyboardAvoidingView>
                <FormLabel labelStyle={styles.form} >Enter Phone Number</FormLabel>
                <FormInput 
                    inputStyle={styles.form}
                    underlineColorAndroid="steelblue"
                    value={this.state.phone}
                    keyboardType='phone-pad'
                    onChangeText={phone => this.setState({ phone })}
                />
            <Button 
                onPress={this.handleSubmit}
                backgroundColor="steelblue"
                title="Sign Up" />
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = ({ isSignup, isSignupError, error }) => {
    return { isSignup, isSignupError, error };
};

const mapDispatchToProps = dispatch => {
    return { signupUser: phone => dispatch(signupUser(phone)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

const styles = StyleSheet.create({
    form: {
        color: 'steelblue',
        borderBottomColor: 'steelblue'
    }
});
