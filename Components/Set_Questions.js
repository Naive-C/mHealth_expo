import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet} from 'react-native';

import Set_Answers from './Set_Answers';

const Set_Questions = (props) => {

    return(
        <View>
            <Text style={styles.question}>{props.question}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    question: {
        marginHorizontal: 15,
        fontWeight: "600",
        fontSize: 20
    },
});

export default Set_Questions;