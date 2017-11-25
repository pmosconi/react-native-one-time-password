import React, { Component } from 'react';
import { Alert, ToastAndroid, View, KeyboardAvoidingView, Text, StyleSheet, Platform } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import InProgress from './InProgress';
import { signinUser } from '../actions';

class SignInForm extends Component {
    state = { phone: '', code: '' };

    handleSubmit = () => {
        const { phone, code } = this.state;
        this.props.signinUser(phone, code);
    };

    render() {
        if (this.props.isSignin)
        return <InProgress text="Sign In"/>;

        if (this.props.isSigninError) {
            if (Platform.OS === 'android')
                ToastAndroid.show(this.props.error, ToastAndroid.LONG);
            else
                Alert.alert(this.props.error);
        }     
        else if (this.props.isAuth) {
            if (Platform.OS === 'android')
                ToastAndroid.show(this.props.token, ToastAndroid.LONG);
            else
                Alert.alert(this.props.token);
        }

        return (
            <KeyboardAvoidingView 
                style={{ marginBottom: 10}}
                behavior="padding"
            >
            
                <FormLabel labelStyle={styles.form} >Enter Phone Number</FormLabel>
                <FormInput 
                    inputStyle={styles.form}
                    underlineColorAndroid="steelblue"
                    value={this.state.phone}
                    keyboardType='phone-pad'
                    onChangeText={phone => this.setState({ phone })}
                />

                <FormLabel labelStyle={styles.form} >Enter Code</FormLabel>
                <FormInput 
                    inputStyle={styles.form}
                    underlineColorAndroid="steelblue"
                    value={this.state.code}
                    keyboardType="phone-pad"
                    onChangeText={code => this.setState({ code })}
                />

                <Button 
                    backgroundColor="steelblue"
                    onPress={this.handleSubmit}
                    title="Sign In" />

            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = ({ isSignin, isSigninError, error, isAuth, token }) => {
    return { isSignin, isSigninError, error, isAuth, token };
};

const mapDispatchToProps = dispatch => {
    return { signinUser: (phone, code) => dispatch(signinUser(phone, code)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

const styles = StyleSheet.create({
    form: {
        color: 'steelblue',
        borderBottomColor: 'steelblue'
    }
});