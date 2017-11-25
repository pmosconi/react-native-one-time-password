import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const InProgress = props => {
    return(
        <View>
            <Text style={styles.progressText} >
                {`${props.text} in Progress...`}
            </Text>
            <Button 
                backgroundColor="steelblue"
                loading={true}
                disabled={true}
                large={true}
                title="" />
        </View>
    );
};

export default InProgress;

const styles = StyleSheet.create({
    progressText: {
        color: 'steelblue',
        marginBottom: 10,
        fontSize: 18
    }
});